from flask import Flask, request, jsonify
import pandas as pd
from scipy.spatial.distance import cdist
import numpy as np
import psycopg2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from flask_cors import CORS
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Database Functions
db_config = {
    'host': 'db',
    'dbname': 'living_stories',
    'user': 'postgres',
    'password': 'senan',
    'port': '5432'
}

def connect_to_database():
    return psycopg2.connect(**db_config)

def fetch_data(query):
    with connect_to_database() as conn:
        return pd.read_sql_query(query, conn)

def fetch_users():
    return fetch_data("SELECT * FROM users")

def fetch_locations():
    return fetch_data("SELECT * FROM locations")

def fetch_followers():
    return fetch_data("SELECT * FROM followers")

def fetch_comments():
    return fetch_data("SELECT * FROM comments")

def fetch_read_stories(user_id):
    return fetch_data(f"SELECT read_story_id FROM recommend_user WHERE user_id = {user_id}")

def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    paragraphs = soup.find_all('p')
    return ' '.join(paragraph.get_text() for paragraph in paragraphs)

def fetch_stories():
    stories_df = fetch_data("SELECT * FROM stories")
    stories_df['rich_text'] = stories_df['rich_text'].apply(extract_text_from_html)
    return stories_df

users_df = fetch_users()
stories_df = fetch_stories()
locations_df = fetch_locations()
followers_df = fetch_followers()
comments_df = fetch_comments()

def vectorize_stories(stories_df):
    vectorizer = TfidfVectorizer(stop_words='english')
    return vectorizer.fit_transform(stories_df['rich_text']), vectorizer

def cluster_stories(X):
    if X.shape[0] < 2:
        raise ValueError("Insufficient data points for clustering")
    
    max_clusters = min(X.shape[0], 10)
    silhouette_scores = []
    
    for k in range(2, max_clusters):
        try:
            kmeans = KMeans(n_clusters=k, random_state=42)
            cluster_labels = kmeans.fit_predict(X)
            silhouette_scores.append(silhouette_score(X, cluster_labels))
        except ValueError as e:
            print(f"Skipping k={k} due to error: {e}")
    
    if not silhouette_scores:
        raise ValueError("No valid clustering found")

    ideal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 2
    kmeans = KMeans(n_clusters=ideal_num_clusters, random_state=42)
    return kmeans.fit_predict(X)

def fetch_most_liked_stories(top_l):
    stories_df['like_count'] = stories_df['likes'].apply(len)
    most_liked_stories = stories_df.sort_values(by='like_count', ascending=False).head(top_l)
    return most_liked_stories

def calculate_label_similarity(user_id, stories_df):
    user_liked_stories = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]['id']
    user_labels = set(stories_df[stories_df['id'].isin(user_liked_stories)]['labels'].explode())
    label_similarity_scores = stories_df['labels'].apply(lambda x: len(set(x).intersection(user_labels)) if x else 0)
    return label_similarity_scores

def calculate_location_similarity(user_id, stories_df, locations_df):
    default_score = 0  
    user_liked_stories_ids = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]['id']

    if user_liked_stories_ids.empty:
        return pd.Series([default_score] * len(stories_df), index=stories_df.index)

    user_liked_story_locations = locations_df[locations_df['story_id'].isin(user_liked_stories_ids)]
    location_similarity_scores = pd.Series([default_score] * len(stories_df), index=stories_df.index)

    for story_id in stories_df['id']:
        current_story_location = locations_df[locations_df['story_id'] == story_id]
        if not current_story_location.empty:
            # Check for any match in city and country
            match = any((user_liked_story_locations['city'] == current_story_location['city'].values[0]) & 
                        (user_liked_story_locations['country'] == current_story_location['country'].values[0]))
            if match:
                location_similarity_scores.loc[story_id] = 1 

    return location_similarity_scores


def calculate_followed_users_likes_scores(user_id, stories_df):
    followed_users = followers_df.loc[followers_df['follower_id'] == user_id, ['following_id']].values[0]
    followed_user_likes = stories_df[stories_df['likes'].apply(lambda likes: any(user in followed_users for user in likes))]['id']
    followed_user_likes_scores = stories_df['id'].isin(followed_user_likes).astype(int)
    return followed_user_likes_scores

def followed_users(user_id, stories_df):
    followed_users = followers_df[followers_df['follower_id'] == user_id]['following_id'].tolist()
    return followed_users

def add_like_count(stories_df):
    stories_df['like_count'] = stories_df['likes'].apply(len)
    return stories_df

def recommend_stories(user_id, top_r):
    add_like_count(stories_df)
    X, vectorizer = vectorize_stories(stories_df)
    stories_df['Cluster'] = cluster_stories(X)
    non_user_stories = stories_df[stories_df['user_id'] != user_id]

    non_user_stories.loc[:, 'label_similarity'] = calculate_label_similarity(user_id, non_user_stories)
    non_user_stories.loc[:, 'location_similarity'] = calculate_location_similarity(user_id, non_user_stories, locations_df)
    non_user_stories.loc[:, 'followed_user_likes'] = calculate_followed_users_likes_scores(user_id, non_user_stories)

    non_user_stories.loc[:, 'combined_score'] = non_user_stories['label_similarity'] + non_user_stories['location_similarity'] + non_user_stories['followed_user_likes']
    max_score = non_user_stories['combined_score'].max()
    non_user_stories.loc[:, 'normalized_score'] = (non_user_stories['combined_score'] / max_score) * 10

    top_recommendations = non_user_stories.sort_values(by='normalized_score', ascending=False).head(top_r)
    
    columns_to_drop = [col for col in top_recommendations.columns if isinstance(top_recommendations[col].iloc[0], list)]
    top_recommendations = top_recommendations.drop(columns=columns_to_drop)

    user_liked_stories = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]
    user_read_stories = fetch_read_stories(user_id)
    user_liked_stories = convert_lists_to_tuples(user_liked_stories)
    user_read_stories = convert_lists_to_tuples(fetch_read_stories(user_id))
    user_liked_and_read_stories = pd.concat([user_liked_stories, user_read_stories]).drop_duplicates()

    if not user_liked_and_read_stories.empty:
        user_preferred_cluster = stories_df[stories_df['id'].isin(user_liked_and_read_stories)]['Cluster'].mode()[0]
        clustered_stories = stories_df[stories_df['Cluster'] == user_preferred_cluster]

        clustered_stories['cluster_score'] = clustered_stories['like_count'] 
        top_cluster_stories = clustered_stories.sort_values(by='cluster_score', ascending=False).head(top_r)

        columns_to_drop = [col for col in top_cluster_stories.columns if isinstance(top_cluster_stories[col].iloc[0], list)]
        top_cluster_stories = top_cluster_stories.drop(columns=columns_to_drop)

        # Combine with existing recommendations
        combined_recommendations = pd.concat([top_recommendations, top_cluster_stories]).head(top_r)
    
        # Get unique top N recommendations
        unique_recommendations = combined_recommendations.drop_duplicates(subset='id').head(top_r)
        return unique_recommendations['id']

    # If there are no preferred cluster, use it without
    return top_recommendations['id']

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    if user_id not in users_df['id'].values:
        return jsonify({"error": "User does not exist"}), 404

    cold_start_threshold = 3
    top_l_stories = 3

    user_likes_count = len(stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)])
    followed_users_count = len(followed_users(user_id, stories_df))
    user_comments_count = len(comments_df[comments_df['user_id'] == user_id])

    user_interactions = user_likes_count + followed_users_count + user_comments_count

    if user_interactions < cold_start_threshold:
        most_liked_stories = fetch_most_liked_stories(top_l_stories)
        return jsonify(most_liked_stories['id'].tolist())
    else:
        recommendations = recommend_stories(user_id, top_r=3)
        return jsonify(recommendations['id'].tolist())
    
@app.after_request
def after_request(response):
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
