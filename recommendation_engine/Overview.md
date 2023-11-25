## Overview:
We have built two recommendation engine models. After testing and discussion, the chosen one will be implemented into the final product!

The recommendation engines we've constructed are a **hybrid model**, which means it merges various recommendation techniques to offer suggestions. Here, we're combining:

1. **Content-Based Recommendation**: Based on the content of the stories (story labels and location).
2. **Collaborative Filtering**: Based on user behavior, i.e., stories liked by similar users.
3. **Social Recommendation**: Recommendations based on users followed.

### rec_engineV1:

### 1. Data Preprocessing:

#### a. Story Label Similarity:
We want to check how similar users are based on the labels of the stories they like. For instance, if User A likes stories with labels "Adventure" and "Travel" and User B has the same inclination, they probably share similar interests.

- We're constructing a matrix (`user_label_matrix`) where rows represent users and columns represent story labels. Each entry denotes the count of stories liked by that user with that label.
  
- We then use **cosine similarity** to determine how similar users are based on these labels.
    - **cosine similarity:** Each user is represented as vectors based on the story labels of the stories they liked. Each dimension of the vector corresponds to a feature (labels in our case) of the user entity. Then, the cosine of the angle between these two vectors is calculated. 
    The cosine value ranges from -1 to 1.
       - 1 means the vectors are identical (the angle is 0°).
        - 0 indicates orthogonality (no similarity, the angle is 90°).
        - -1 implies exactly opposite directions (the angle is 180°).
    In short, a higher cosine similarity means greater similarity between two users. 

#### b. Story Location Similarity:
The premise here is that if two users often post or like stories from similar geographical locations, they might have shared interests or experiences.

- For every user, we find the average latitude and longitude of the stories they liked (mean coordinates).
  
- We then compute the Euclidean distance between the average coordinates of the target user and the locations of all stories in the dataset. This gives us a measure of how "close" each story's location is to the user's typical story locations.

### 2. Hybrid Recommendation Mechanism:

#### a. Compute Similarities:
- Using the methods described above, we compute label similarity and location proximity for our target user against all stories.

#### b. Factor in Social Connections:
- For users the target user follows, we give an additional score. This is based on the presumption that we tend to like content from people we follow.

#### c. Aggregate Scores:
- We combine label similarity, location proximity, and social connection into a single score for each story. The weights assigned to each factor (`0.4`, `0.4`, and `0.2` respectively in the code) determine their importance in the final score. These weights can be adjusted.

#### d. Recommend:
- Stories are ranked by their final aggregated scores, and the top `n` stories are recommended to the user.

### Key Concepts Used:

1. **Cosine Similarity**: Measures the cosine of the angle between two non-zero vectors. If the vectors are identical, the cosine is 1, and if the vectors are orthogonal, the cosine is 0. It's useful for determining similarity in systems where the magnitude of vectors doesn't matter.

2. **Euclidean Distance**: Measures the "ordinary" straight-line distance between two points in Euclidean space. Here, we've used it inversely (the closer two stories are, the higher the similarity score).

3. **Hybrid Model**: Combines different recommendation methodologies to overcome the limitations of individual methods and provide more accurate recommendations.

### What Does This Mean for Our Users:
For a user, this recommendation system ensures that:

- They get story recommendations based on the content they've shown an interest in (via labels).
  
- They get recommendations of stories from nearby locations or locations they frequently post about or like.
  
- Stories from users they follow are prioritized, ensuring that the social aspect of the platform is accounted for.

By considering multiple factors in the recommendation process, this system aims to provide well-rounded and accurate suggestions that align with individual user preferences and behaviors.

### Potential drawbacks:

1. **Cold Start Problem**: For new users or items, the system might struggle since there's limited data to compute recommendations. This is a typical issue for recommendation engines.

2. **Weights Arbitrary**: The weights used (e.g., `0.4`, `0.4`, `0.2`) to combine different recommendation techniques are set arbitrarily. They might not represent the best combination and may need fine-tuning based on actual user interactions.

3. **Scalability**: As the data grows, computing cosine similarities for every user and every label, as well as location distances, can become computationally intensive.

4. **Reliance on Explicit Data**: This model heavily relies on explicit data like story labels, likes, and follows. If a user is passive and doesn't interact much, the recommendations might not be as accurate.

5. **Sensitivity to Noise**: Incorrect labels or outliers in location data can affect the recommendations. For instance, a single story with a wrongly tagged location might skew the average location used in the location similarity computation.

6. **Location Average**: Averaging out story locations to get a "mean location" is a simplification. Users might have multi-modal distributions of story locations (e.g., they post both from home and a vacation spot). The average might not capture this nuance.

## rec_engineV2:

### 1. Data Preprocessing:

#### a. Label-Based Similarity:
This measures how similar a story is to the user’s interests, based on the labels of stories they have liked.

- We calculate the proportion of overlapping labels between the user's liked stories and each story in the dataset.
- A higher overlap indicates a higher similarity in content preferences.

#### b. Location Proximity:
This focuses on the geographical aspect, assuming users might prefer stories from locations similar to those they've shown interest in.

- We calculate the average location (latitude and longitude) of the stories liked by the user.
- The Euclidean distance between this average location and the location of each story in the dataset is computed. A smaller distance indicates closer proximity.

### 2. Hybrid Recommendation Mechanism:

#### a. Compute Individual Scores:
- **Label Similarity**: For each story, we calculate how many labels match with the user's liked stories.
- **Location Proximity**: For each story, we find its distance to the average location of the user's liked stories.
- **Social Connections**: We check if the story is liked by users that the target user follows.

#### b. Aggregate Scores:
- We combine these individual scores into a single score for each story. This combined score is a simple sum of the individual scores.

#### c. Recommend:
- Stories are ranked by their combined score, and the top `n` stories are recommended to the user.

### Key Concepts Used:

1. **Label-Based Similarity**: A measure of content preference based on the overlap of labels/tags between the user's liked stories and each story in the dataset.

2. **Euclidean Distance for Location Proximity**: Used to calculate the geographical closeness of stories to the user’s preferred locations, with closer stories receiving higher scores.

3. **Social Influence in Recommendations**: Stories liked by followed users are given preference, incorporating a social dimension into the recommendations.

### What Does This Mean for Our Users:
Users will receive story recommendations that:

- Align with their content preferences as indicated by the labels of stories they have liked.
  
- Are geographically relevant or similar to locations they have shown interest in.

- Include stories popular among users they follow, adding a social layer to the recommendations.

### Potential Drawbacks:

1. **Data Dependency**: The accuracy of recommendations heavily relies on the user's past interactions (likes, follows).

2. **New User Challenge**: New users with few interactions might receive less accurate recommendations (cold start problem).

3. **Overfitting to User's Past Preferences**: The model might over-emphasize the user's existing preferences, potentially limiting exposure to a broader range of content.

4. **Simplicity of Location Calculation**: Averaging locations might oversimplify and not capture the diversity of a user's geographical interests.

