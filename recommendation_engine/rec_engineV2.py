from flask import Flask, request, jsonify
import pandas as pd
from scipy.spatial.distance import cdist
import numpy as np
import psycopg2

app = Flask(__name__)

#Dummy Data
'''
users_df = pd.DataFrame({
    'id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'name': ['Salih', 'Senan', 'Omar', 'Cansel', 'Burak', 'Erhan', 'Suzan', 'Asya', 'Ali Hakan', 'Ayse'],
    'followed_users': [[2, 3], [3, 4], [1, 4], [5, 7], [6, 8], [1, 9], [10], [7, 6], [5], [2, 3, 4]]  # Users following other users
})

stories_df = pd.DataFrame({
    'id': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
    'header': ['Story A', 'Story B', 'Story C', 'Story D', 'Story E', 'Story F', 'Story G', 'Story H', 'Story I', 'Story J', 'Story K', 'Story L', 'Story M', 'Story N', 'Story O', 'Story P', 'Story Q', 'Story R', 'Story S', 'Story T'],
    'labels': [['Adventure', 'Fantasy'], ['Mystery'], ['Adventure'], ['Fantasy'], ['Sci-Fi'], ['Mystery'], ['Adventure'], ['Fantasy'], ['Sci-Fi'], ['Adventure'], ['History'], ['Biography'], ['Adventure', 'History'], ['Sci-Fi', 'Fantasy'], ['Mystery', 'Crime'], ['Biography'], ['Romance'], ['Romance', 'Adventure'], ['Fantasy'], ['Sci-Fi']]
})

likes_df = pd.DataFrame({
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'story_id': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
})

locations_df = pd.DataFrame({
    'story_id': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
    'lat': [34.05, 48.85, 51.51, 40.71, 35.68, 34.05, 48.85, 51.51, 40.71, 35.68, 34.05, 48.85, 51.51, 40.71, 35.68, 34.05, 48.85, 51.51, 40.71, 35.68],
    'lng': [-118.25, 2.35, -0.13, -74.01, 139.69, -118.25, 2.35, -0.13, -74.01, 139.69, -118.25, 2.35, -0.13, -74.01, 139.69, -118.25, 2.35, -0.13, -74.01, 139.69]
})
'''

# Database Functions
db_config = {
    'host': 'jdbc:postgresql://db:5432/living_stories',
    'dbname': 'living_stories',
    'user': 'postgres',
    'password': 'senan'
}

def connect_to_database():
    return psycopg2.connect(**db_config)

def fetch_data(query):
    with connect_to_database() as conn:
        return pd.read_sql_query(query, conn)

# Fetch functions for each table
def fetch_users():
    return fetch_data("SELECT * FROM users")

def fetch_stories():
    return fetch_data("SELECT * FROM stories")

def fetch_likes():
    return fetch_data("SELECT * FROM likes")

def fetch_locations():
    return fetch_data("SELECT * FROM locations")

users_df = fetch_users()
stories_df = fetch_stories()
likes_df = fetch_likes()
locations_df = fetch_locations()


def calculate_label_similarity(user_id, stories_df):
    user_liked_stories = likes_df[likes_df['user_id'] == user_id]['story_id']
    user_labels = set(stories_df[stories_df['id'].isin(user_liked_stories)]['labels'].explode())
    label_similarity_scores = stories_df['labels'].apply(lambda x: len(set(x).intersection(user_labels)) / len(set(x)))
    return label_similarity_scores

def calculate_location_proximity(user_id, stories_df, locations_df):
    user_liked_stories = likes_df[likes_df['user_id'] == user_id]['story_id']
    user_locations = locations_df[locations_df['story_id'].isin(user_liked_stories)][['lat', 'lng']].mean().to_numpy()
    story_locations = locations_df.set_index('story_id').loc[stories_df['id']][['lat', 'lng']].to_numpy()
    proximity_scores = 1 / (1 + np.linalg.norm(story_locations - user_locations, axis=1))
    return proximity_scores

def check_followed_users_likes(user_id, stories_df):
    followed_users = users_df.loc[user_id - 1, 'followed_users']
    followed_users_likes = likes_df[likes_df['user_id'].isin(followed_users)]['story_id']
    followed_user_likes_scores = stories_df['id'].isin(followed_users_likes).astype(int)
    return followed_user_likes_scores

def recommend_stories(user_id, top_n=5):
    stories_df['label_similarity'] = calculate_label_similarity(user_id, stories_df)
    stories_df['location_proximity'] = calculate_location_proximity(user_id, stories_df, locations_df)
    stories_df['followed_user_likes'] = check_followed_users_likes(user_id, stories_df)

    # Calculate a combined score
    stories_df['combined_score'] = stories_df['label_similarity'] + stories_df['location_proximity'] + stories_df['followed_user_likes']

    # Normalize the scores
    max_score = stories_df['combined_score'].max()
    stories_df['normalized_score'] = (stories_df['combined_score'] / max_score) * 10

    # Get top N recommendations
    top_recommendations = stories_df.sort_values(by='normalized_score', ascending=False).head(top_n)
    return top_recommendations[['id', 'header', 'normalized_score']]


@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    recommendations = recommend_stories(user_id)
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5002)
