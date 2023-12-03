from flask import Flask, request, jsonify
import pandas as pd
from scipy.spatial.distance import cdist
import numpy as np
import psycopg2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

def vectorize_stories(stories_df):
    vectorizer = TfidfVectorizer(stop_words='english')
    return vectorizer.fit_transform(stories_df['header']), vectorizer

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

def fetch_stories():
    return fetch_data("SELECT * FROM stories")

def fetch_locations():
    return fetch_data("SELECT * FROM locations")

def fetch_followers():
    return fetch_data("SELECT * FROM followers")

users_df = fetch_users()
stories_df = fetch_stories()
locations_df = fetch_locations()
followers_df = fetch_followers()

def fetch_most_liked_stories(top_m):
    stories_df['like_count'] = stories_df['likes'].apply(len)
    most_liked_stories = stories_df.sort_values(by='like_count', ascending=False).head(top_m)
    return most_liked_stories

def calculate_label_similarity(user_id, stories_df):
    user_liked_stories = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]['id']
    user_labels = set(stories_df[stories_df['id'].isin(user_liked_stories)]['labels'].explode())
    label_similarity_scores = stories_df['labels'].apply(lambda x: len(set(x).intersection(user_labels)) / len(set(x)) if x else 0)
    return label_similarity_scores

def calculate_location_proximity(user_id, stories_df, locations_df):
    user_liked_stories = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]['id']
    if user_liked_stories.empty:
        return pd.Series([0]*len(stories_df))
    user_locations = locations_df[locations_df['story_id'].isin(user_liked_stories)][['lat', 'lng']].mean().to_numpy()
    story_locations = locations_df.set_index('story_id').loc[stories_df['id']][['lat', 'lng']].to_numpy()
    proximity_scores = 1 / (1 + np.linalg.norm(story_locations - user_locations, axis=1))
    return proximity_scores

def check_followed_users_likes(user_id, stories_df):
    followed_users = followers_df.loc[followers_df['follower_id'] == user_id, ['following_id']].values[0]
    #Returns story['id']
    followed_user_likes = stories_df[stories_df['likes'].apply(lambda likes: any(user in followed_users for user in likes))]['id']
    followed_user_likes_scores = stories_df['id'].isin(followed_user_likes).astype(int)
    return followed_user_likes_scores

def add_like_count(stories_df):
    stories_df['like_count'] = stories_df['likes'].apply(len)
    return stories_df

def recommend_stories(user_id, top_n=3):
    add_like_count(stories_df)
    X, vectorizer = vectorize_stories(stories_df)
    stories_df['Cluster'] = cluster_stories(X)
    non_user_stories = stories_df[stories_df['user_id'] != user_id]

    non_user_stories['label_similarity'] = calculate_label_similarity(user_id, non_user_stories)
    non_user_stories['location_proximity'] = calculate_location_proximity(user_id, non_user_stories, locations_df)
    non_user_stories['followed_user_likes'] = check_followed_users_likes(user_id, non_user_stories)

    non_user_stories['combined_score'] = non_user_stories['label_similarity'] + non_user_stories['location_proximity'] + non_user_stories['followed_user_likes']
    max_score = non_user_stories['combined_score'].max()
    non_user_stories['normalized_score'] = (non_user_stories['combined_score'] / max_score) * 10

    top_recommendations = non_user_stories.sort_values(by='normalized_score', ascending=False).head(top_n)
    
    columns_to_drop = [col for col in top_recommendations.columns if isinstance(top_recommendations[col].iloc[0], list)]
    top_recommendations = top_recommendations.drop(columns=columns_to_drop)

    user_liked_stories = stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)]
    if not user_liked_stories.empty:
        user_preferred_cluster = user_liked_stories['Cluster'].mode()[0]
        clustered_stories = stories_df[stories_df['Cluster'] == user_preferred_cluster]

        clustered_stories['cluster_score'] = clustered_stories['like_count'] 
        top_cluster_stories = clustered_stories.sort_values(by='cluster_score', ascending=False).head(top_n)

        columns_to_drop = [col for col in top_cluster_stories.columns if isinstance(top_cluster_stories[col].iloc[0], list)]
        top_cluster_stories = top_cluster_stories.drop(columns=columns_to_drop)

        # Combine with existing recommendations
        combined_recommendations = pd.concat([top_recommendations, top_cluster_stories]).head(top_n)
    
        # Get unique top N recommendations
        unique_recommendations = combined_recommendations.drop_duplicates(subset='id').head(top_n)
        return unique_recommendations[['id']]

    # If there are no preferred cluster, use it without
    return top_recommendations[['id']]

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    print(users_df)
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    cold_start_threshold = 3
    top_m_stories = 3

    user_interactions = len(stories_df[stories_df['likes'].apply(lambda likes: user_id in likes)])
    if user_interactions < cold_start_threshold:
        most_liked_stories = fetch_most_liked_stories(top_m_stories)
        return jsonify(most_liked_stories['id'].tolist())
    else:
        recommendations = recommend_stories(user_id, top_n=5)
        return jsonify(recommendations['id'].tolist())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)