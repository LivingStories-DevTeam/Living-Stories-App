import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance

def compute_label_similarity(data):
    user_label_matrix = data.groupby(['user_id', 'story_labels']).size().unstack(fill_value=0)
    return cosine_similarity(user_label_matrix)

def compute_location_similarity(user_id, data):
    user_coords = data[data['user_id'] == user_id][['story_latitude', 'story_longitude']].mean()
    distances = []
    for index, row in data.iterrows():
        story_coords = (row['story_latitude'], row['story_longitude'])
        distances.append(distance.euclidean(user_coords, story_coords))
    return distances


def hybrid_recommendations(user_id, data, top_n=5):
    # Compute label and location similarities
    label_similarity = compute_label_similarity(data)
    location_distances = compute_location_similarity(user_id, data)

    # Get stories liked by the user
    liked_stories = data[data['user_id'] == user_id]['story_id'].unique()

    # Get users followed by the user
    followed_users = data[data['user_id'] == user_id]['followed_users'].unique()

    scores = {}
    for index, row in data.iterrows():
        story_id = row['story_id']
        
        if story_id in liked_stories:
            continue

        user_idx = data[data['user_id'] == row['user_id']].index[0]

        label_sim_score = label_similarity[user_id][user_idx]
        location_distance_score = 1 / (1 + location_distances[index])  # inverse to give higher score to lower distances

        social_score = 1 if row['user_id'] in followed_users else 0
        
        # Combine scores (weights can be adjusted)
        final_score = 0.4 * label_sim_score + 0.4 * location_distance_score + 0.2 * social_score

        scores[story_id] = final_score

    # Sort stories based on scores
    recommended_stories = sorted(scores, key=scores.get, reverse=True)[:top_n]
    return recommended_stories


user_id = 123
recommendations = hybrid_recommendations(user_id, data)
print(recommendations)

