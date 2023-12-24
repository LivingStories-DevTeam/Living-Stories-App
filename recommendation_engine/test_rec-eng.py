import pytest
from unittest.mock import patch, MagicMock
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import csr_matrix
from rec_engineV4 import (
    app,
    extract_text_from_html, 
    fetch_users, 
    fetch_stories,
    fetch_comments,
    fetch_locations,
    fetch_followers, 
    vectorize_stories, 
    cluster_stories,
    recommend_stories,
    fetch_most_liked_stories,
    calculate_label_similarity,
    calculate_location_similarity,
    calculate_followed_users_likes_scores
)

# Convert Dummy Data to Pandas DataFrames
users_data = pd.DataFrame([
    {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},
    {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'},
    {'id': 3, 'name': 'Charlie', 'email': 'charlie@example.com'},
    {'id': 4, 'name': 'Diana', 'email': 'diana@example.com'},
    {'id': 5, 'name': 'Eve', 'email': 'eve@example.com'}
])

stories_data = pd.DataFrame([
    {'id': 1, 'user_id': 1, 'rich_text': '<p>This is a story about science.</p>', 'likes': [2, 3], 'labels': ['science', 'technology']},
    {'id': 2, 'user_id': 2, 'rich_text': '<p>This is a story about art.</p>', 'likes': [1, 3, 4], 'labels': ['art']},
    {'id': 3, 'user_id': 3, 'rich_text': '<p>This is a story about travel.</p>', 'likes': [4], 'labels': ['travel', 'adventure']},
    {'id': 4, 'user_id': 4, 'rich_text': '<p>This is a story about cooking.</p>', 'likes': [2, 5, 1, 3], 'labels': ['cooking', 'food']},
    {'id': 5, 'user_id': 5, 'rich_text': '<p>This is a story about sports.</p>', 'likes': [1], 'labels': ['sports', 'health']}
])

locations_data = pd.DataFrame([
    {'story_id': 1, 'city': 'New York', 'country': 'USA'},
    {'story_id': 2, 'city': 'Paris', 'country': 'France'},
    {'story_id': 3, 'city': 'Tokyo', 'country': 'Japan'},
    {'story_id': 4, 'city': 'Rome', 'country': 'Italy'},
    {'story_id': 5, 'city': 'London', 'country': 'UK'}
])

followers_data = pd.DataFrame([
    {'follower_id': 1, 'following_id': 2},
    {'follower_id': 2, 'following_id': 3},
    {'follower_id': 3, 'following_id': 4},
    {'follower_id': 4, 'following_id': 5},
    {'follower_id': 5, 'following_id': 1}
])

comments_data = pd.DataFrame([
    {'user_id': 1, 'story_id': 2, 'comment': 'Great story!'},
    {'user_id': 2, 'story_id': 3, 'comment': 'Very interesting!'},
    {'user_id': 3, 'story_id': 4, 'comment': 'Loved this one.'},
    {'user_id': 4, 'story_id': 5, 'comment': 'Amazing read!'},
    {'user_id': 5, 'story_id': 1, 'comment': 'Unique content.'}
])

# Test Functions
@patch('rec_engineV4.pd.read_sql_query')
@patch('rec_engineV4.connect_to_database')
def test_fetch_users(mock_connect, mock_read_sql):
    mock_connect.return_value.__enter__.return_value = MagicMock()
    mock_read_sql.return_value = users_data
    result = fetch_users()
    mock_read_sql.assert_called_once()
    assert result.shape == users_data.shape

@patch('rec_engineV4.pd.read_sql_query')
@patch('rec_engineV4.connect_to_database')
def test_fetch_stories(mock_connect, mock_read_sql):
    mock_connect.return_value.__enter__.return_value = MagicMock()
    mock_read_sql.return_value = stories_data
    result = fetch_stories()
    mock_read_sql.assert_called_once()
    assert result.shape == stories_data.shape

@patch('rec_engineV4.pd.read_sql_query')
@patch('rec_engineV4.connect_to_database')
def test_fetch_comments(mock_connect, mock_read_sql):
    mock_connect.return_value.__enter__.return_value = MagicMock()
    mock_read_sql.return_value = comments_data
    result = fetch_comments()
    mock_read_sql.assert_called_once()
    assert result.shape == comments_data.shape

@patch('rec_engineV4.pd.read_sql_query')
@patch('rec_engineV4.connect_to_database')
def test_fetch_locations(mock_connect, mock_read_sql):
    mock_connect.return_value.__enter__.return_value = MagicMock()
    mock_read_sql.return_value = locations_data
    result = fetch_locations()
    mock_read_sql.assert_called_once()
    assert result.shape == locations_data.shape

@patch('rec_engineV4.pd.read_sql_query')
@patch('rec_engineV4.connect_to_database')
def test_fetch_followers(mock_connect, mock_read_sql):
    mock_connect.return_value.__enter__.return_value = MagicMock()
    mock_read_sql.return_value = followers_data
    result = fetch_followers()
    mock_read_sql.assert_called_once()
    assert result.shape == followers_data.shape

@patch('rec_engineV4.BeautifulSoup')
def test_extract_text_from_html(mock_soup):
    mock_soup.return_value.find_all.return_value = [MagicMock(get_text=lambda: 'text')]
    result = extract_text_from_html('<p>dummy html</p>')
    assert result == 'text'

def test_calculate_label_similarity():
    user_id = 1
    result = calculate_label_similarity(user_id, stories_data)
    assert isinstance(result, pd.Series)

def test_calculate_location_similarity():
    user_id = 1
    result = calculate_location_similarity(user_id, stories_data, locations_data)
    assert isinstance(result, pd.Series)

def test_calculate_followed_users_likes_scores():
    user_id = 1
    result = calculate_followed_users_likes_scores(user_id, stories_data)
    assert isinstance(result, pd.Series)

@patch('rec_engineV4.stories_df', new_callable=lambda: stories_data.copy())
def test_fetch_most_liked_stories(mock_stories_df):
    top_l = 3
    mock_stories_df['likes'] = mock_stories_df['id'].apply(lambda x: list(range(x, x + top_l)))
    result = fetch_most_liked_stories(top_l)
    assert len(result) == top_l

def test_vectorize_stories():
    assert 'rich_text' in stories_data.columns
    X, vectorizer = vectorize_stories(stories_data)
    assert isinstance(X, csr_matrix)
    assert isinstance(vectorizer, TfidfVectorizer)

def test_cluster_stories():
    mock_matrix = csr_matrix(np.array([[0.1, 0.2], [0.2, 0.3], [0.4, 0.5], [0.5, 0.6]]))
    cluster_labels = cluster_stories(mock_matrix)
    assert isinstance(cluster_labels, (list, np.ndarray))
    assert len(cluster_labels) == mock_matrix.shape[0]

@patch('rec_engineV4.add_like_count')
@patch('rec_engineV4.vectorize_stories')
@patch('rec_engineV4.cluster_stories')
@patch('rec_engineV4.calculate_label_similarity')
@patch('rec_engineV4.calculate_location_similarity')
@patch('rec_engineV4.calculate_followed_users_likes_scores')
def test_recommend_stories(mock_followed_likes, mock_location, mock_label, mock_cluster, mock_vectorize, mock_add_likes):
    user_id = 1
    top_r = 3
    mock_add_likes.return_value = stories_data.copy()
    mock_vectorize.return_value = (csr_matrix(np.random.random((5, 5))), None) 
    mock_cluster.return_value = pd.Series([0, 1, 2, 0, 1]) 
    mock_label.return_value = pd.Series([1, 0, 2, 1, 0]) 
    mock_location.return_value = pd.Series([0, 2, 1, 0, 2])  
    mock_followed_likes.return_value = pd.Series([2, 1, 0, 2, 1]) 
    recommendations = recommend_stories(user_id, top_r)
    assert isinstance(recommendations, pd.DataFrame)
    assert len(recommendations) == top_r

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_get_recommendations_valid_user(client):
    response = client.get('/recommendations?user_id=1')
    assert response.status_code == 200

def test_get_recommendations_invalid_user(client):
    response = client.get('/recommendations?user_id=999')
    assert response.status_code == 404

def test_after_request(client):
    response = client.get('/some_valid_route')
    assert 'Content-Type' in response.headers