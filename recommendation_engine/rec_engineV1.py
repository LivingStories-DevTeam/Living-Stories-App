from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance
import functools
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global data variable
data = None

#Load the data IF we choose to send the backend database periodically to rec-engines local database
#data = pd.read_csv('dataset.csv')

def validate_data(data):
    required_columns = {'user_id', 'story_id', 'story_labels', 'story_latitude', 'story_longitude'}
    if not all(column in data.columns for column in required_columns):
        return False, "Missing required columns"
    return True, "Data is valid"

@app.route('/receive_data', methods=['POST'])
def receive_data():
    global data
    json_data = request.get_json()
    try:
        received_data = pd.DataFrame(json_data)
        print("Received data:", received_data) 

        is_valid, message = validate_data(received_data)
        if not is_valid:
            print("Data validation failed:", message)  
            return jsonify({"error": message}), 400
        data = received_data
        return jsonify({"message": "Data received successfully"}), 200
    except ValueError as e:
        print("Error:", e) 
        return jsonify({"error": str(e)}), 400


@functools.lru_cache(maxsize=100)
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

@functools.lru_cache(maxsize=100)
def hybrid_recommendations(user_id, data, top_n=5):
    # Compute label and location similarities
    label_similarity = compute_label_similarity(data)
    location_distances = compute_location_similarity(user_id, data)

    liked_stories = data[data['user_id'] == user_id]['story_id'].unique()
    
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

def get_recommendations(user_id):
    user_id = int(user_id)
    global data
    if data is None:
        return []  # Return an empty list or handle the error if 'data' is not set
    # Call the hybrid_recommendations function with the global 'data'
    return hybrid_recommendations(user_id, data, top_n=5)

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    # Validate user_id is provided and is an integer
    if user_id is None or not user_id.isdigit():
        return jsonify({"error": "Invalid or missing user_id"}), 400
    
    recommendations = get_recommendations(user_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5002)



