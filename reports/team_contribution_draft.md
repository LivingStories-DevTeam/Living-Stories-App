# Living Stories
#### Members: Sanan Eminli, Burak Koçak, Cansel Uzun, Ali Hakan Özen, Salih Yavuz, Erhan Yaşar, Omar Ghamrawi

#### Date: 01/02/2024
### Course: SWE 574 - Fall 2023 - Term Project
#### Git Repository: https://github.com/SWE574-G3/Living-Stories-App

#### Git Tag Version: !!!!

#### Deployment URL: http://livingstories.online

## Table of content

- [Deliverables](#deliverables)
- [Demo User](#demo-user)
- [Project Details](#project-details)
    * [Status of the Deployment](#status-of-the-deployment)
    * [Dockerization Status](#dockerization-status)
    * [Project Overview](#project-overview)
    * [Software Requirements Specification](#software-requirements-specification)
        + [1. Functional Requirements](#1-functional-requirements)
        + [1.1 User Requirements](#11-user-requirements)
        + [1.2 System Requirements](#12-system-requirements)
        + [2. Non-Functional Requirements](#2-non-functional-requirements)
    * [Design (Software & Mockups)](#design--software---mockups-)
    * [Status of the project](#status-of-the-project)
    * [System Manual](#system-manual)
        + [Requirements](#requirements)
        + [Installation instructions](#installation-instructions)
    * [User Manual](#user-manual)
    * [Test Results](#test-results)


## Deliverables

**List and status of deliverables:**

| #   | Deliverable description                                         | Status     |Deliverable|
|-----|-----------------------------------------------------------------|------------|---------|
| 1   | Fully functioning mobile app.                                          | Completed |[URL](https://github.com/SWE574-G3/Living-Stories-App/blob/reports/resources/QRCode.jpg)       |
| 2   | Fully functioning web application.                                    | Completed |[URL](http://livingstories.online)       |
| 3   | Github Repository                                               | Completed |[URL](https://github.com/SWE574-G3/Living-Stories-App)       |
| 4   | Project Report                                                  | Completed |[URL](https://github.com/SWE574-G3/Living-Stories-App/tree/main/reports)       |



## Demo User

Email: **suzan.uskudarli@gmail.com**\
Name: **Suzan Üsküdarlı**\
Password: **123456**


## Project Details

### Status of the Deployment
The application is deployed onto Google Cloud Platform(GCP) and it is fully functioning.
URL: http://livingstories.online


### Dockerization Status
The application is fully dockerized. Each part of the application (Back End, Front End, Database and reccomendation engine) are containerized individually.

### Demo videos 
[Mobile Demo video](https://www.youtube.com/watch?v=fRT3WcLz9Qk)
[Web Demo video](https://www.youtube.com/watch?v=n-zY_CPTbWg)
### Project Overview
In order to satisfy the requriments of this project, we needed to develop a fully functioning web application which is for sharing stories. The stories should be location, date and tag based with other supportive functionalities. We have delivered an web application with all the capabilities to satisfy the requirements. It lets user to interact with each other, share stories and interact wit hother stories. The other requirement to be delivered was to have an functional mobile applicaiton. We have delivered the mobile application with all the requirements specified. Also, we utilized the benefits of mobile application like camera and live location. Lastly, we wanted to build a recommendation engine. It needed use different aspects of stories like labels, locations, content similiarty and such. We have also delivered a fully functioning transparent recommendation engine which utilizes the location, labels, user interactions, and content similiarty. We also wanted to keep all of the projected structure in Github, at the and, we have github page with multiple branches for multiple development efforts.

In summary we have delivered the following:

-  Fully functioning web application
-  Mobile application
-  recommendation engine
-  Well orginized github page


### Software Requirements Specification
#### 1. Functional Requirements

#### 1.1 User Requirements
- 1.1.1 The users shall be able to see all user memories shared by other users on the home page.
- 1.1.2 The users shall be able to see all user memories shared by followed users on the home page.
- 1.1.3 The users shall be able to change the user password.
- 1.1.4 The users shall be able to add tags to the memories.
- 1.1.5 The users shall be able to filter the stories.
- 1.1.6 The users shall be able to filter by title.
- 1.1.7 The users shall be able to filter by username.
- 1.1.8 The users shall be able to filter by tag.
- 1.1.9 The users shall be able to filter by location.
- 1.1.10 The users shall be able to filter by the start date.
- 1.1.11 The users shall be able to filter by the end date.
- 1.1.12 The users shall be able to follow other users.
- 1.1.13 The users shall receive story or user recommendations based on their activity and interests.
- 1.1.14 The users shall be able to find and view stories based on their current geolocation.
- 1.1.15 The users shall be able to search and find stories within a specific geographical radius.
- 1.1.16 The users shall be able to create stories using photos taken from their mobile device.
- 1.1.17 The users shall be able to use their mobile device location to pin a story.
- 1.1.18 The users shall be able to view a timeline of stories sorted by story start date, with a vertical design that includes a story card featuring like, comment, title, user, and location details.
- 1.1.19 The users shall be able to view actions related to their stories and followers in the "activity stream".
- 1.1.20 The users shall be able to view stories associated with a specific place, sorted by the start date.

#### 1.2 System Requirements
- 1.2.1 The home page shall display four user stories.
- 1.2.2 The app should provide recover password functionality on the login page.
- 1.2.3 The app should provide search functionality to help users find specific memories.
- 1.2.4 The app should allow users to edit or modify memories after they have been shared.
- 1.2.5 The app should support other file formats for shared memories, such as photos and text.
- 1.2.6 The app should have a feature to allow users to give feedback on shared memories, such as liking or commenting.
- 1.2.7 The app should have a feature to allow users to follow other users, such as friends or family members, to share memories.
- 1.2.8 The app should allow users to track when a memory post was created or shared.
- 1.2.9 The app should provide options for saving memories as a draft.
- 1.2.10 The app should have a function for deleting the story.
- 1.2.11 The app should have a function for deleting the user account.
- 1.2.12 The app should have a function for editing the account's username, photo, and bio.
- 1.2.13 The app should allow users to add location data to their memories, such as where the memory was created by the user.
- 1.2.14 The app should allow users to add date data to their memories, such as when that memory happened.
- 1.2.15 The memory page should open when the user clicks on other people's memory.
- 1.2.16 The app should have the landing, main, profile, search, and new post pages.
- 1.2.17 The app should allow users to search for memories by various criteria, such as keywords, geolocation, and tags.
- 1.2.18 The mobile app should interface with the "Living History WebApp" through a REST API.
- 1.2.19 The app should be available across both Android and iOS mobile platforms.
- 1.2.20 The app should request privacy permissions for location services, local storage, and camera access before accessing those features.
- 1.2.21 The activity stream page should display actions (like, follow, comment) of the users followed and actions related to the user's own stories and profile.

#### 2. Non-Functional Requirements
- 2.1 The password should be at least eight characters.




### Design (Software & Mockups)
![GeneralDesign](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/ad939ac3-1674-4b58-9190-6714a940f05a)

![UseCaseDiagram](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/da0e1786-d6dc-4643-8254-046400787f04)
![LoginSequence](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/b6f00186-7514-43e8-945d-0eec2fceff36)
![SignUpSequence](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/5c685cd9-169b-4fe7-91b4-8089f86b09c9)
![PostSequence](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/214dc6c8-5257-4ea9-a89b-d64ced5f6252)

![LikeSequence](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/f3e10fc3-dd0c-4f09-a609-7a208f8faa57)

![CommentSequence](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/0102f8c0-41b4-433e-98ca-f8ed86486125)
![RecommendtationActivity](https://github.com/SWE574-G3/Living-Stories-App/assets/78790662/fc41cd17-a7bd-4803-a2a8-36af3c03c14a)


### Status of the project


| Requirement                           |Status |
|---------------------------------------| -------- |
| [1.1.1](#11-user-requirements)        | **Completed**     |
| [1.1.2](#11-user-requirements)        | **Completed**     |
| [1.1.3](#11-user-requirements)        | **Not completed**|
| [1.1.4](#11-user-requirements)        | **Completed** |
| [1.1.5](#11-user-requirements)        | **Completed** |
| [1.1.6](#11-user-requirements)        | **Completed** |
| [1.1.7](#11-user-requirements)        | **Completed** |
| [1.1.8](#11-user-requirements)        | **Completed** |
| [1.1.9](#11-user-requirements)        | **Completed** |
| [1.1.10](#11-user-requirements)       |**Completed**|
| [1.1.11](#11-user-requirements)       |**Completed**|
| [1.1.12](#11-user-requirements)       |**Completed**|
| [1.1.13](#11-user-requirements)       |**Completed**|
| [1.1.14](#11-user-requirements)       |**Completed**|
| [1.1.15](#11-user-requirements)       |**Completed**|
| [1.1.16](#11-user-requirements)       |**Completed**|
| [1.1.17](#11-user-requirements)       |**Completed**|
| [1.1.18](#11-user-requirements)       |**Completed**|
| [1.1.19](#11-user-requirements)       |**Completed**|
| [1.1.20](#11-user-requirements)       |**Completed**|
| [1.2.1](#12-system-requirements)      |**Completed** |
| [1.2.2](#12-system-requirements)      | **Not completed**     |
| [1.2.3](#12-system-requirements)      |**Completed**|
| [1.2.4](#12-system-requirements)      |**Completed**|
| [1.2.5](#12-system-requirements)      |**Completed**|
| [1.2.6](#12-system-requirements)      |**Completed**|
| [1.2.7](#12-system-requirements)      |**Completed**|
| [1.2.8](#12-system-requirements)      |**Completed**|
| [1.2.9](#12-system-requirements)      | **Not completed**     |
| [1.2.10](#12-system-requirements)     |**Completed**|
| [1.2.11](#12-system-requirements)     |**Completed**|
| [1.2.12](#12-system-requirements)     |**Completed**|
| [1.2.13](#12-system-requirements)     |**Completed**|
| [1.2.14](#12-system-requirements)     |**Completed**|
| [1.2.15](#12-system-requirements)     |**Completed**|
| [1.2.16](#12-system-requirements)     |**Completed**|
| [1.2.17](#12-system-requirements)     |**Completed**|
| [1.2.18](#12-system-requirements)     |**Completed**|
| [1.2.19](#12-system-requirements)     |**Completed**|
| [1.2.20](#12-system-requirements)     |**Completed**|
| [1.2.21](#12-system-requirements)     |**Completed**|
| [2.1](#2-non-functional-requirements) | **Not completed**    |

## System Manual
## Web App

To run the web project on your local machine, follow these steps:

1. Install Docker on the system.
    [How to install Docker engine](https://docs.docker.com/engine/install/)
1. Clone the project repository.
`git clone https://github.com/SWE574-G3/Living-Stories-App.git`
1. Place the environment file (env) inside the Living-Stories-App/front.end folder. 
```
POSTGRES_USER: PostgreSQL database username.
POSTGRES_PASSWORD: Password for the PostgreSQL user.
POSTGRES_DB: Name of the PostgreSQL database.
VITE_BACKEND_URL: Base URL for the backend service in a front-end application.
VITE_GOOGLE_API_KEY: Google API key for accessing Google services.
DB_PASSWORD: Password for connecting to the PostgreSQL database.
DB_URL: JDBC URL for connecting to the PostgreSQL database.
DB_USERNAME: Username for connecting to the PostgreSQL database.
VITE_BACKEND_PYTHON_URL: Base URL for a Python backend service in the application.
```
3. Navigate to the Living-Stories-App folder using the command line.
 `cd Living-Stories-App`
3. Run the following command to start the project:

    `docker compose build`
This command will automatically install the necessary dependencies and build images.
1. Run 
     `docker compose up -d`
     This command will run images.
     
Once the process is complete, user can visit http://localhost:3000 to use the website.

## Mobile App
1. **Install Node.js:** Download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/).

2. **Install Expo CLI:** Open a terminal and run the following command to install Expo CLI globally:

    ```
    npm install -g expo-cli
    ```

3. **Clone the GitHub repository:** Open a terminal and run the following command to clone the repository to the local machine:

    ```
    git clone https://github.com/SWE574-G3/Living-Stories-App.git
    ```

4. **Navigate to the "mobile" folder:** Change into the "mobile" folder of the cloned repository using the cd command:

    ```
    cd Living-Stories-App/mobile
    ```

5. **Install project dependencies:** Inside the "mobile" folder, install the project dependencies using:

    ```
    npm install
    ```

6. **Start the Expo development server:** Run the following command to start the Expo development server:

    ```
    expo start
    ```

7. **Open Expo app on the device:**

    - For iOS, use the Expo Go app from the App Store.
    - For Android, use the Expo Go app from the Google Play Store.

8. **Scan the QR code:** Open the Expo Go app on the device and use it to scan the QR code displayed in the terminal or on the Expo DevTools webpage.

9. **Wait for the app to build:** Expo will now build the project, and the user should see the app running on the device.


### User Manual

[User Manual](https://github.com/SWE574-G3/Living-Stories-App/blob/reports/reports/user_manual.md)

### Test Results

#### Backend Service Unit Tests:

![image](https://github.com/SWE574-G3/Living-Stories-App/assets/64078926/9edc270d-4636-42aa-9d22-cb881840ca25)

Final coverage is seen in the screenshot above.
We have used Mockito and Junit to test our Java code.
The percentages for each class are Class Coverage, Method Coverage and Line Coverage respectively.

StoryService has a lot of functionality in a singe service due to new requirements which makes it hard to test unit by unit.
Tried to cover core functionalities (of stories) as much as possible.
Consider splitting StoryService in the future.


#### Recommendation Engine Unit Tests:

#### Selenium Tests:

Selenium test cases are created for easily repeatable testing for web application. 

For more details, users can [follow](https://github.com/SWE574-G3/Living-Stories-App/tree/main/selenium_test_cases) the instructions and try it themselves.

Test results of the screenshot is shared below.

![Screenshot of tests](https://github.com/SWE574-G3/Living-Stories-App/assets/115476700/06ca8da3-64de-4392-ad7d-e2b636ba5c09)


#### Manual Tests:

Every team member tested the functionalties that we have implemented in the production environment with real users. 
No serious bugs have been observed so far in the current state of the project.

# Individual Contributions




## SANAN EMINLI

## Contrubitions
Through this project, I took on the task of creating a mobile app from scratch. This implies that I have made numerous essential contributions to the project. However, this list will highlight the most influential and challenging ones. Additionally, the issues include commits, allowing the reader to explore commits directly from the issue.

* **Create organization:** Copying my older project to the organization and creating necessary files and branches for developing the mobile app inside the repository 
    * **Issues:**  [#5](https://github.com/SWE574-G3/Living-Stories-App/issues/5), [#21](https://github.com/SWE574-G3/Living-Stories-App/issues/21), [#22](https://github.com/SWE574-G3/Living-Stories-App/issues/22) 
    
    

* **Creating the mobile infrastructure:** I established crucial React Native folders and implemented fundamental authentication features, which are essential for a social media mobile app. This includes integrating JWT authentication for user login and registration. To enhance security, I stored the JWT token on the device using the Expo SecureStore library, ensuring that the token cannot be accessed from outside the app.

	Moreover, I utilized React Native context for managing the JWT token, allowing for seamless sharing of authentication credentials across various screens. This context-driven approach enables us to easily determine and track user authentication status throughout the app.
    * **Issues:** [#26](https://github.com/SWE574-G3/Living-Stories-App/issues/26), [#29](https://github.com/SWE574-G3/Living-Stories-App/issues/29), [#34](https://github.com/SWE574-G3/Living-Stories-App/issues/34)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.18, 1.2.19, 1.2.20

* **Creating navigation in mobile app**: To using navigation within the mobile app, I used React Native Navigation. With React Native Navigation, we can create a stack, allowing us to push new screens onto the stack and gain control over the user's navigation experience within the app. Additionally, I used bottom tabs that are always visible to the user, providing quick access to key features like the home page, posting a new story, and viewing the user's profile.

    I integrated  with the existing JWT authentication system. The app checks whether the user has a JWT token stored on their device. Based on this information, the app dynamically determines which screens to display. If the user lacks a JWT token, only the login and registration screens are shown. Once the user logs in successfully, the app presents other screens while excluding the login and registration screens from the view.
    * **Issues:** [#24](https://github.com/SWE574-G3/Living-Stories-App/issues/24), [#25](https://github.com/SWE574-G3/Living-Stories-App/issues/25) 

* **Created main screens for mobile app:** Creating *post story, story page, my profile, and feed screen* with basic functionalities such as API calls and data fetching. This entails necessary data, such as recent stories, user names, photos, and comments, all coming in through API connections and working as intended. Additionally, all these screens are added to the React Native navigation stack navigator route. Design changes, like displaying incoming data to the users, will be addressed later by me and my teammate, Omar.
    * **Issues:**  [#30](https://github.com/SWE574-G3/Living-Stories-App/issues/30), [#31](https://github.com/SWE574-G3/Living-Stories-App/issues/31), [#32](https://github.com/SWE574-G3/Living-Stories-App/issues/32), [#33](https://github.com/SWE574-G3/Living-Stories-App/issues/33) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.16

* **Adding a map to the story page:** In this instance, I have incorporated a map into the story page. Users can view the map and marker positioned at the top of the screen, indicating the locations where stories unfolded. Placing the map at the top of the story enhances visibility for the user. Initially, I installed the necessary libraries for map integration; in this case, I utilized the react-native-maps library. With React Native maps, we have the flexibility to use different map providers such as Apple Maps or Google Maps. We opted for Google Maps as it is more familiar to most users, and Apple Maps may encounter compatibility issues on Android phones. After selecting the provider, we obtained a Google API key. On this screen, we specify the marker's latitude and longitude to accurately display the locations. 
    * **Issues:** [#38](https://github.com/SWE574-G3/Living-Stories-App/issues/38)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.17, 1.2.13

* **Like Story:** I added a like button component to the code. Since there are two things to like—stories and comments—I created a component for it, following the 'Don't Repeat Yourself' (DRY) principle. Using a component for liking allows us to reuse the code for both stories and comments, avoiding duplication.

    When a user presses the like button, the component checks whether it is for a comment or a story, as the endpoint differs. Upon pressing the button, it sends an API request indicating that the user liked the story or comment, updating the like count and the liked icon accordingly.

    For each displayed story or comment, the component checks whether the user has liked it previously. If it has been liked, the filled version of the icon is shown, indicating that the story or comment was liked by the logged-in user. Pressing the button again unlikes the comment, immediately updating the icon and like count.
    * **Issues:** [#80](https://github.com/SWE574-G3/Living-Stories-App/issues/80)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.6

* **Comment Story:** Added commenting on a story functionality to the app. When user write a comment code will send user input text to the backend and comments array inside story will be uptaded. 
    * **Issues:** [#82](https://github.com/SWE574-G3/Living-Stories-App/issues/82)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements)1.2.6

* **Search:** I have created an initial search screen and added necessary libraries and API calls for further development. 
    * **Issues:** [#94](https://github.com/SWE574-G3/Living-Stories-App/issues/94) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.5, 1.1.6, 1.1.7, 1.1.8, 1.1.9, 1.1.10, 1.1.11
 
* **Location selection for story create and search:** I have implemented map selection for both the search and story creation functionalities. Two separate map screens were created, utilizing a pop-up screen for rendering the map. In the story creation map, when a user presses a location on the map, it retrieves latitude and longitude data and gathers additional necessary information such as the name of the location, city, and country from the Google Maps Places API. After obtaining this information, it is added to an array of selected locations, which is then displayed to the user with location names atop the map.

    In the story create map, a delete button has been included, allowing users to remove selected locations easily. When a user presses the red bin icon, the associated location is removed, and the selected locations array is updated.

    To provide a slightly different experience in the search map, it also features autocomplete functionality. However, users can select only one location here. Additionally, a radius slider is placed at the bottom of the screen, indicating the distance in kilometers that the user wishes to see results from the search query.

    Moreover, I've integrated Google Autocomplete location search functionality into both maps. This feature provides autocomplete results from the Google API as the user types a location. Upon selecting a result, it retrieves the location's latitude and longitude information and gathers the necessary details mentioned above from the Google Geolocations API.

    Upon completing the location selection, if the user presses the 'Select Locations' button, an alert is displayed indicating the successful location selection. Pressing 'OK' on the alert closes the pop-up screen. Additionally, I have incorporated the ability to retrieve the user's location from the device, including handling necessary user permissions. When the user presses 'Get My Location,' the application fetches the user's device location.
    * **Issues:** [#95](https://github.com/SWE574-G3/Living-Stories-App/issues/95), [#97](https://github.com/SWE574-G3/Living-Stories-App/issues/97) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.9, 1.2.20

* **Activity Stream:** I have implemented an activity stream screen with a corresponding button located at the top of the feed. When a new activity occurs, the backend sends the number of new activities, and I display this count on top of the button. Users can press the bell icon to navigate to the activity screen, where new activities are marked with a red dot.

    Each activity is assigned a specific meaning based on its type, as indicated by the endpoint. For instance, if the activity involves liking or commenting on a story, users can press the corresponding text on the screen to navigate directly to the related story and comment section. Similarly, if the activity pertains to a user's follower following another user, pressing the text allows the user to navigate to the profile page of the other user. 
    * **Issues:** [#100](https://github.com/SWE574-G3/Living-Stories-App/issues/100)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.19, 1.2.21

* **Initial timeline:** Created an initial timeline page with basic design and functionality with endpoints and routes. Added falling leaf animation to the view. 
    * **Issues:** [#131](https://github.com/SWE574-G3/Living-Stories-App/issues/131)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.18

* **Follower list:** I added a follower list to the profile page. When a user presses the 'followers' button, they can see which users are following the particular user. 
    * **Issues:**  [#156](https://github.com/SWE574-G3/Living-Stories-App/issues/156) 

* **Like List:** I added a liked user list to the story page. Users can now see which users liked a particular story. 
    * **Issues:**  [#160](https://github.com/SWE574-G3/Living-Stories-App/issues/160) 

 
### Important Bug Fixes and Code Improvements

* **Solving Case-Sensitive Email Issue:** Before the solution, users could not log in to their accounts because emails were stored in lowercase in the database, causing an error. We solved it by converting all input strings to lowercase.
  * **Issues:** [#48](https://github.com/SWE574-G3/Living-Stories-App/issues/48)
  * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/ceecd33d4b415ee82fccc81be9364761987bb237)

* **Solving Radius Problem on Search:** Radius was stored in meters on the search map screen. We fixed this bug by dividing the meter value by 1000 to convert meters to kilometers because in the backend, we are calculating it with kilometers.
  * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/fdcad3dd6219d71f98b0559f4af9174aa8d43187)

* **Creating Native Edit Story Instead of WebView:** Initially, we made the edit story on mobile WebView. However, this caused several issues, such as increased loading time and a non-responsive user interface. Therefore, we removed the WebView and added a native edit story screen.
  * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/08a545da717e4de6f903dd77a7548206f4ef4ee8)

* **Modify the Post Story Endpoint to Be Compatible with the Advanced Post Story Endpoint:** We used the old create story endpoint for creating stories, causing problems such as not having the required locations field for the timeline. That's why we changed the endpoint and added a new field for creating stories.
  * **Issues:** [#165](https://github.com/SWE574-G3/Living-Stories-App/issues/165)
  * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/e6d8eacf44b1af9adf5507037a88ed63037b26be)

* **Major UI Improvements:** Changed the design of the search and activity buttons, feed tab, and added a header for search screens.
  * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/07099e7939dba8c2214eb7e89589801889167668)


## Executive Summary
I have provided the necessary information for my project and assisted the corresponding teams in understanding both the code and database design. From the outset, I've helped form teams aligned with their areas of interest and abilities. In the mobile team, I was responsible for choosing the framework for our project, opting for React Native based on our team members' skill sets. Additionally, I collaborated with teammates, making changes and ensuring a well-crafted UI.

## Demo
This is the map selection for creating stories. Location selection can be accomplished in various ways, such as redirecting the user to another screen. Previously, we followed this approach where users would select locations and then return to the story creation page. However, in order to enhance the user experience, I have implemented a modal – a pop-up screen.

<img src="https://github.com/SWE574-G3/Living-Stories-App/assets/57816597/f8955bf9-0dea-4e60-ac0c-bc39e33ec91d" width="360" height="700">



Within this modal, when the user presses on a location, it is selected. I have personally designed the map inside the modal. Upon selecting a location, the app retrieves information about that place, including latitude, longitude, the name of the location, city, and country. This data is then stored in an array, and the names of the locations are presented to the user.

To further empower users, I've added a button for deleting a location in case the user wishes to remove it. Additionally, there's a 'Get My Location' functionality on this page. When the user presses the 'Get My Location' button, the app fetches the user's geolocation information and displays it. This feature allows users to effortlessly select and create a story based on their current location.

### Challenge
During the implementation, the primary challenge was designing the inside of the modal. Since modal sizes can vary from one phone to another, and button positions may shift accordingly, I had to use percentages from the edges of the modal screen for a responsive layout. Additionally, retrieving the location city name posed a challenge. The inconsistency arises because sometimes it is referred to as the city, while in other instances, it is labeled as administrative area level 2. Consequently, I needed to iterate through each detail to identify the city accurately.



## Documentation 
I collaborate with my teammate, Omar, to document mobile meeting notes. In addition to that, I am responsible for drafting various mobile requirements.

## Pull requests
[#59](https://github.com/SWE574-G3/Living-Stories-App/pull/59): Adding mobile development folder and codes to the main. We have tested the code in the test branch and then merged it into the main branch.

[#63](https://github.com/SWE574-G3/Living-Stories-App/pull/63): Adding executable living_stories.apk file to the main repository.  I added apk deliverables to the main branch.



## Code review
**Merging Mobile Post Story to the mobile branch** 

During our code review, Omar and I made some changes to how the post story works. Initially, we used a WebView, but it caused problems with the user interface. So, we decided to switch to a more straightforward, native way of handling the post story.

In the code review, I moved to the branch with these changes. I looked through the code to find any initial bugs or issues. After checking everything carefully, I started the emulator to test the post story with different types of data. If I found any problems, I let the team know on Discord.

Once I was sure that everything was working well, I gave the green light on the pull request. This meant we could combine the branch with the post story changes into the main mobile branch, so everyone could use the updated code.
[(See the pull request)](https://github.com/SWE574-G3/Living-Stories-App/pull/163)

Generally, my code review is about the mobile app. When I review the code, I initially pull the changes to my local machine to look for initial bugs or anything crucial to our app's main function. If the code seems okay, I proceed with mobile user acceptance testing. However, if I find a bug, I immediately notify my mobile team member, Omar, about the issue through the instant messaging app called Discord. Additionally, we leverage **SonarCloud** for this project. We also check the SonarCloud quality analysis when we merge, which contains insights into code quality, bugs, and other aspects like security and etc. If there are crucial issues we missed, SonarCloud highlights them, and we correct them immediately.
 

# Issues
## Assigned By Me

| Issue Number | Title                                                            | Assigned By      | Assigned To                      | Status            |
|--------------|------------------------------------------------------------------|------------------|----------------------------------|-------------------|
| [#5](https://github.com/SWE574-G3/Living-Stories-App/issues/5)      | Clone Sanan's code to this repo                                   | sananeminli      |                                  | :white_check_mark:|
| [#17](https://github.com/SWE574-G3/Living-Stories-App/issues/17)    | Add hardcoded locations backend                                   | sananeminli      | sananeminli                      | :white_check_mark:|
| [#21](https://github.com/SWE574-G3/Living-Stories-App/issues/21)    | Create mobile folder in repo                                       | sananeminli      | sananeminli                      | :white_check_mark:|
| [#22](https://github.com/SWE574-G3/Living-Stories-App/issues/22)    | Create new branch for mobile development                           | sananeminli      | sananeminli                      | :white_check_mark:|
| [#26](https://github.com/SWE574-G3/Living-Stories-App/issues/26)    | Add authentication infrastructure to the main app                 | sananeminli      | sananeminli                      | :white_check_mark:|
| [#29](https://github.com/SWE574-G3/Living-Stories-App/issues/29)    | Remove TailWind                                                   | sananeminli      | sananeminli, Omar4GH, Ali-Hakan   | :white_check_mark:|
| [#34](https://github.com/SWE574-G3/Living-Stories-App/issues/34)    | Add env file for url                                              | sananeminli      | sananeminli                      | :white_check_mark:|
| [#35](https://github.com/SWE574-G3/Living-Stories-App/issues/35)    | Improve design of Login page                                       | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#36](https://github.com/SWE574-G3/Living-Stories-App/issues/36)    | Improve design of Register page                                    | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#37](https://github.com/SWE574-G3/Living-Stories-App/issues/37)    | Improve design of Story Feed page                                  | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#38](https://github.com/SWE574-G3/Living-Stories-App/issues/38)    | Add map to the Story Page                                          | sananeminli      | sananeminli                      | :white_check_mark:|
| [#39](https://github.com/SWE574-G3/Living-Stories-App/issues/39)    | Software Design Documents UML                                     | sananeminli      | sananeminli, BurakKocak99        | :white_check_mark:|
| [#48](https://github.com/SWE574-G3/Living-Stories-App/issues/48)    | Solve type-sensitive email problem                                 | sananeminli      | sananeminli                      | :white_check_mark:|
| [#76](https://github.com/SWE574-G3/Living-Stories-App/issues/76)    | Add story create page to the mobile                                | sananeminli      | sananeminli, Omar4GH              | :white_check_mark:|
| [#77](https://github.com/SWE574-G3/Living-Stories-App/issues/77)    | Add Area Drawing to the Map                                        | sananeminli      | sananeminli, Ali-Hakan            | :white_check_mark:|
| [#80](https://github.com/SWE574-G3/Living-Stories-App/issues/80)    | Add like story button to the mobile                                | sananeminli      | sananeminli                      | :white_check_mark:|
| [#81](https://github.com/SWE574-G3/Living-Stories-App/issues/81)    | Add follow user button to the mobile                               | sananeminli      | sananeminli                      | :white_check_mark:|
| [#82](https://github.com/SWE574-G3/Living-Stories-App/issues/82)    | Add comment functionality to the story page                        | sananeminli      | sananeminli                      | :white_check_mark:|
| [#94](https://github.com/SWE574-G3/Living-Stories-App/issues/94)    | Create Search Screen                                               | sananeminli      | sananeminli                      | :white_check_mark:|
| [#95](https://github.com/SWE574-G3/Living-Stories-App/issues/95)    | Add mapview for search                                             | sananeminli      | sananeminli                      | :white_check_mark:|
| [#96](https://github.com/SWE574-G3/Living-Stories-App/issues/96)    | Search possible datetime picker for search screen                  | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#97](https://github.com/SWE574-G3/Living-Stories-App/issues/97)    | Add search with current location to the search page                | sananeminli      | sananeminli                      | :white_check_mark:|
| [#98](https://github.com/SWE574-G3/Living-Stories-App/issues/98)    | Header Search Bug                                                  | sananeminli      | sananeminli, yavuzsa, BurakKocak99, Ali-Hakan | :white_check_mark:|
| [#100](https://github.com/SWE574-G3/Living-Stories-App/issues/100)  | Create activity stream page                                        | sananeminli      | sananeminli                      | :white_check_mark:|
| [#102](https://github.com/SWE574-G3/Living-Stories-App/issues/102)  | Solve radius bug on mobile map                                     | sananeminli      | sananeminli                      | :white_check_mark:|
| [#106](https://github.com/SWE574-G3/Living-Stories-App/issues/106)  | Add icon for search and activity button, improve design of the tab selector | sananeminli      | sananeminli                      | :white_check_mark:|
| [#129](https://github.com/SWE574-G3/Living-Stories-App/issues/129)  | Add current location button to the story create screen              | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#130](https://github.com/SWE574-G3/Living-Stories-App/issues/130)  | Add current location button to the search screen                    | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#133](https://github.com/SWE574-G3/Living-Stories-App/issues/133)  | Correct the tag scroll bug                                          | sananeminli      | Omar4GH                          | :white_check_mark:|
| [#134](https://github.com/SWE574-G3/Living-Stories-App/issues/134)  | Parse rich text data from story to get only content without media file | sananeminli      | JohnsL-U                         | :white_check_mark:|
| [#156](https://github.com/SWE574-G3/Living-Stories-App/issues/156)  | Add follower list to the profile                                    | sananeminli      | sananeminli                      | :white_check_mark:|
| [#157](https://github.com/SWE574-G3/Living-Stories-App/issues/157)  | Compress profile photo size while editing                           | sananeminli      | sananeminli                      | :white_check_mark:|
| [#158](https://github.com/SWE574-G3/Living-Stories-App/issues/158)  | Create liked user list                                              | sananeminli      | yavuzsa, BurakKocak99            | :white_check_mark:|
| [#160](https://github.com/SWE574-G3/Living-Stories-App/issues/160)  | Show list of users who liked the story                              | sananeminli      | sananeminli                      | :white_check_mark:|



## Assigned To Me
| Issue Number | Title                                                           | Assigned By   | Assigned To                      | Status            |
|--------------|-----------------------------------------------------------------|---------------|----------------------------------|-------------------|
| [#2](https://github.com/SWE574-G3/Living-Stories-App/issues/2)      | Create custom issue labels                                        | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)      | Align with group members on backend and database technologies      | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#4](https://github.com/SWE574-G3/Living-Stories-App/issues/4)      | Align with group members on how to handle the UI and mobile application aspect | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)      | Prepare Responsibility Assignment Matrix                           | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)      | Getting familiar with the base project                              | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#23](https://github.com/SWE574-G3/Living-Stories-App/issues/23)    | Implementing a Homepage Navigation Bar                             | Ali-Hakan     | sananeminli, Omar4GH, Ali-Hakan   | :white_check_mark:|
| [#24](https://github.com/SWE574-G3/Living-Stories-App/issues/24)    | Implement the Navigation system for the Mobile App                 | Omar4GH       | sananeminli                      | :white_check_mark:|
| [#25](https://github.com/SWE574-G3/Living-Stories-App/issues/25)    | Create Mobile Screens/Pages                                       | Omar4GH       | sananeminli                      | :white_check_mark:|
| [#30](https://github.com/SWE574-G3/Living-Stories-App/issues/30)    | Create Story Page with Basic Functions                             | Omar4GH       | sananeminli, Omar4GH              | :white_check_mark:|
| [#31](https://github.com/SWE574-G3/Living-Stories-App/issues/31)    | Create Post Story Page with Basic Functions                        | Omar4GH       | sananeminli, Omar4GH              | :white_check_mark:|
| [#32](https://github.com/SWE574-G3/Living-Stories-App/issues/32)    | Create My Profile Page with Basic Functions                         | Omar4GH       | sananeminli, Omar4GH              | :white_check_mark:|
| [#33](https://github.com/SWE574-G3/Living-Stories-App/issues/33)    | Create Feed Page with Basic Functions                               | Omar4GH       | sananeminli, Omar4GH              | :white_check_mark:|
| [#34](https://github.com/SWE574-G3/Living-Stories-App/issues/34)    | Add env file for url                                               | sananeminli   | sananeminli                      | :white_check_mark:|
| [#42](https://github.com/SWE574-G3/Living-Stories-App/issues/42)    | Complete the Software Requirements Specification Document         | JohnsL-U      | sananeminli, JohnsL-U             | :white_check_mark:|
| [#45](https://github.com/SWE574-G3/Living-Stories-App/issues/45)    | Prepare Milestone Review Report                                    | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#46](https://github.com/SWE574-G3/Living-Stories-App/issues/46)    | Release Pre-release Version of the Software                        | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|
| [#49](https://github.com/SWE574-G3/Living-Stories-App/issues/49)    | Improve Design of My Profile Page                                  | Omar4GH       |                                   |                   |
| [#93](https://github.com/SWE574-G3/Living-Stories-App/issues/93)    | Review and Provide Feedback on Alternative Recommendation Engine  | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99 | :white_check_mark:|
| [#101](https://github.com/SWE574-G3/Living-Stories-App/issues/101)  | Enhance User Experience by Developing a Recommendation Data Service and Controller | Ali-Hakan     | sananeminli, Ali-Hakan            | :white_check_mark:|
| [#132](https://github.com/SWE574-G3/Living-Stories-App/issues/132)  | Milestone 2 Review Report                                          | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH | :white_check_mark:|



## Other

**Read and Liked stories table and endpoints:** I have created a new database table and necessary endpoints for storing users' read stories and liked stories lists, collaborating with Ali Hakan through pair programming. This table will aid in developing a recommendation engine. Storing read stories will enhance the accuracy and insightfulness of recommendations provided to the user.
* [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/8758948288a58394ab80cbc5e4407e5422704d53)





## Ali Hakan Özen

### Executive Summary

Throughout the project, I have actively participated in several key developments, contributing to enhancements in both the frontend and backend aspects of our application.

- **Timeline Page Creation:** I led the development of the Timeline page, handling both its frontend and backend implementations. This included adding a quick search feature and redesigning date filterizations to enhance user interaction and functionality.
- **Multiple Polynomial Location Service:** I created a backend service that enables the addition of multiple polynomial locations in the story creation page, significantly enhancing the storytelling aspect of our application.
- **Image Resizing for Performance:** To improve performance, I implemented a functionality that resizes images added in the story creation page, ensuring efficient loading and better user experience.
- **State Management Refactoring:** I refactored state management across all pages, focusing on increasing stability and performance of the application.
- **Activity Stream Implementation:** I successfully implemented the Activity Stream on the frontend, providing users with a dynamic way to view recent activities and interactions.
- **Recommendation Engine Integration:** I integrated a recommendation engine as a new tab on the frontend, enhancing content discoverability and personalization for users.
- **Beam Runner for Story Compatibility:** I developed a beam runner that updates old stories, making them compatible with our new polynomial search services, ensuring seamless integration of legacy content.
- **Property Management for Service Compatibility:** I managed property settings for old services to align them with new polynomial story functionalities, maintaining consistency and compatibility across the application.
- **SonarCloud Integration:** To ensure high code quality, I integrated SonarCloud into our pull request process. This tool tracks code smells and bugs, aiding in maintaining coding standards and reducing potential issues.

### Detailed Contributions

**Clarification:** Each of the referenced issues includes associated commits. The [Requirements](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) for the project are collectively documented on the designated webpage. However, individual URLs for each specific requirement are not available as they are consolidated in a single, comprehensive document. While some requirements are not extensively differentiated across different features that utilize similar functionalities, these have been omitted for the sake of brevity.  Additionally, explicit references to code locations are not included in the issues, since the associated commits inherently contain the necessary code changes.

#### Timeline Page Creation

**Related Requirements:** 

- 1.1.14 
- 1.1.15
- 1.1.18
- 1.2.15
- 1.2.17

**Related Issues:**
- [Design and Implement a Timeline Page #52](https://github.com/SWE574-G3/Living-Stories-App/issues/52)
	- **Code Description:** The Timeline page was developed from scratch, encompassing both frontend and backend elements.
- [Solution for Google Maps Radius Trigger Event #61](https://github.com/SWE574-G3/Living-Stories-App/issues/61)
    - **Code Description:** Initially, adjustments made to the radius for the circular search did not activate the search service. This issue was identified and subsequently resolved.
- [Revamp Timeline Page UI for Enhanced User Interface #112](https://github.com/SWE574-G3/Living-Stories-App/issues/112)
	- **Code Description:** The Timeline page underwent a significant redesign after feedback from the _Milestone 2_ presentation. The new design features a visually appealing, horizontal layout. To augment user engagement and interactivity, intuitive navigation controls were integrated.
- [Enhancements and Fixes Implemented for Advanced Timeline Search Functionality #114](https://github.com/SWE574-G3/Living-Stories-App/issues/114)
	- **Code Description:** The Timeline page filter section received an enhancement with the addition of a circular search mechanism.

#### Multiple Polynomial Location Service

**Related Requirements:** 

- 1.2.13

**Related Issues:**
- [Resolving Front-End Location City Bug #146](https://github.com/SWE574-G3/Living-Stories-App/issues/146)
    - **Code Description:** The initial incorrect implementation of locations obtained from the Google API location service, due to the inaccurate setting of latitude and longitude values, was subsequently identified and rectified.

#### Image Resizing for Performance

**Related Requirements:**

- 1.2.5

**Related Issues:**
- [Image Compression Feature to React-Quill #51](https://github.com/SWE574-G3/Living-Stories-App/issues/51)
    - **Code Description:** To address the potential issue of large image sizes in stories slowing down the homepage and search functions, a compression method has been implemented for images uploaded via Quill.

#### State Management Refactoring

**Related Issues:**
- [Optimize Directory Structure for Configuration #151](https://github.com/SWE574-G3/Living-Stories-App/issues/151)
    - **Code Description:** This straightforward task entailed simply renaming directories to conform to standard naming conventions.
- [Implementing Jakarta ID over Annotation ID for Database Recognition in Entity Classes #161](https://github.com/SWE574-G3/Living-Stories-App/issues/161)
    - **Code Description:** The Jakarta ID reference is essential for the proper activation of JPA queries. In this instance, there was a deviation from this standard, which has now been rectified to ensure correct query functionality.
- [Enhance Frontend State Management in React: Refactoring #11](https://github.com/SWE574-G3/Living-Stories-App/issues/11)
    - **Code Description:** Unlike other issues, this one is not linked to a specific commit, as the task was addressed progressively through the implementation and refactoring of various code segments. The objective was to enhance state management within React, focusing on improving data response speed and adhering to standardized clean code practices.

#### Activity Stream Implementation

**Related Requirements:** 

- 1.1.19

**Related Issues:**
- [Implemented Activity Stream Feature in Navigation Bar #119](https://github.com/SWE574-G3/Living-Stories-App/issues/119)
    - **Code Description:** The Activity Stream feature has been seamlessly integrated into the navigation bar, represented as a bell icon. This interactive element, when clicked, triggers a side drawer, providing easy access to the activity stream from any page within the application.

#### Recommendation Engine Integration

**Related Requirements:** 

- 1.1.13

**Related Issues:**
- [Enhance User Experience by Developing a Recommendation Data Service and Controller #101](https://github.com/SWE574-G3/Living-Stories-App/issues/101)
    - **Code Description:** In addition to introducing a recommendation tab on the homepage, a specialized service was developed. This service facilitates communication between the backend Spring application and the recommendation engine Flask application, enabling the  transfer of data. It ensures that all necessary stories and their contents are appropriately fetched and utilized in the recommendation process.
- [Develop a Personalized Recommendation Tab for the Home Screen #113](https://github.com/SWE574-G3/Living-Stories-App/issues/113)
    - **Code Description:** The implementation of a recommendation engine was completed, integrating it into the frontend. This allows users to easily access personalized story recommendations directly from the home screen.
- [Addressing Recommendation Tab Display Issue #147](https://github.com/SWE574-G3/Living-Stories-App/issues/147)
    - **Code Description:** This issue involved setting restrictions to limit the number of stories displayed in the recommendation tab, ensuring only a specific amount of stories are recommended at a time. This problem has been effectively resolved.

#### Beam Runner for Story Compatibility

**Related Issues:** 
- [Updating Legacy Story Creation Service for Polygon Creation #149](https://github.com/SWE574-G3/Living-Stories-App/issues/149)
    - **Code Description:** A Beam Runner has been integrated into the backend application, activated automatically with each server restart. This Beam Runner operates as an auto-triggered service during application initialization. In this specific use case, it was employed to update the location properties of older stories, which were initially empty due to the introduction of a new location type.

#### Property Management for Service Compatibility

**Related Issues:**
- [Enhance Location Data for Legacy Stories #148](https://github.com/SWE574-G3/Living-Stories-App/issues/148)
    - **Code Description:** Concurrent with the implementation of drawing tools, I developed an enhanced story creation service that utilizes an advanced location property. Recognizing the ongoing need for this property in legacy services -such as our mobile application, I modified the request entity's location property. This adjustment ensures that the location is automatically set correctly, even when interfacing with legacy services.

#### SonarCloud Integration

**Related Issues:**
- [Implement SonarQube Integration for Repository Code Analysis #13](https://github.com/SWE574-G3/Living-Stories-App/issues/13)
    - **Code Description:** The integration of SonarQube for repository code analysis was achieved by setting up a _.yml_ configuration file and workflows. This configuration automates the integration with GitHub pull requests, streamlining the code analysis process.
- [Integrate All Branches with SonarQube #41](https://github.com/SWE574-G3/Living-Stories-App/issues/41)
    - **Code Description:** In this task, I expanded SonarCloud's quality gate criteria to include every branch in the repository, ensuring comprehensive code quality analysis across all development branches.

#### Other Contributions

- [Implementing a Homepage Navigation Bar #23](https://github.com/SWE574-G3/Living-Stories-App/issues/23)
    - **Code Description:** This task involved adding templates for all pages and creating a corresponding navigation bar for the mobile application.
- [Launch Announcement: Second Milestone Achievement #121](https://github.com/SWE574-G3/Living-Stories-App/issues/121)
    - **Description:** For the second milestone, I initiated a dedicated pull request prior to the final merge, and also prepared a new version release of the application.

### Pull Requests

#### Assignee

- [Comprehensive Evaluation of Project Progress: Milestone 2 #120](https://github.com/SWE574-G3/Living-Stories-App/pull/120)
    - **Description:** I initiated a dedicated pull request prior to the final merge. [#121](https://github.com/SWE574-G3/Living-Stories-App/issues/121)
- [Remerged into mobile #122](https://github.com/SWE574-G3/Living-Stories-App/pull/122)
    - **Description:** I conducted a rebase and merge of the frontend branch into the mobile branch to proactively address and resolve any potential conflicts.
- [Add area drawing to the map #83](https://github.com/SWE574-G3/Living-Stories-App/pull/83)
    - **Description:** Regrettably, this pull request extends beyond its initial scope, as outlined in its title and description, by merging multiple functional developments at once, including the implementation of drawing tools.
- [Bug resolved #62](https://github.com/SWE574-G3/Living-Stories-App/pull/62)
    - **Description:** This pull request signifies a prompt and effective resolution of a reported bug, with further details available in the comment within the request. [#61](https://github.com/SWE574-G3/Living-Stories-App/issues/61)
- [Unable to use LIKE operator... #58](https://github.com/SWE574-G3/Living-Stories-App/pull/58)
    - **Description:** Similarly, this pull request represents a prompt resolution to a bug, with details available in the associated issue. [#57](https://github.com/SWE574-G3/Living-Stories-App/issues/57)
- [SonarQube and Timeline Page #55](https://github.com/SWE574-G3/Living-Stories-App/pull/55)
    - **Description:** As the title suggests, this pull request encompasses changes related to both the timeline page and SonarQube integration. It is _presumably_ deemed appropriate to merge these changes simultaneously.
- [Create sonarcloud.yml #12](https://github.com/SWE574-G3/Living-Stories-App/pull/12)
    - **Description:** This pull request contains a small yet crucial contribution related to the integration of SonarCloud.

#### Reviewer

**Clarification:** While I am the primary contributor responsible for frontend development, it is worth noting that I have not encountered frequent pull requests from other contributors that require my evaluation for frontend-related changes.

- [Feature/Web frontend redesign #150](https://github.com/SWE574-G3/Living-Stories-App/pull/150)
    - **Description:** This pull request reflects Omar's redesign of the frontend user interface. In this pull request, I addressed all the visual enhancements. We meticulously tackled potential conflicts to ensure their resolution was precise and did not inadvertently lead to any other issues. However, it can be _noted_ that a detailed explanation of these steps was not included in the comment section, which, in hindsight, is regrettable.

### Demo

**Clarification:** This section highlights the most challenging aspect of development.

**Description:** As illustrated in the image below, a circular search mechanism has been incorporated to facilitate the location-based search for stories. Initially, this implementation was relatively straightforward when stories were point-based. However, with the introduction of the new feature, polynomial locations, the circular search had to be significantly enhanced to effectively detect stories within these complex location boundaries.

![image](https://hackmd.io/_uploads/HJOfWhxd6.png)

To address the problem, I used geolocational ray tracing, harnessing the capabilities of the Geometry Factory from the OSGeo library. All of these methods, written in the service layer, exclusively serve this specific purpose.

```
    private boolean locationMatches(Locations location, Point searchCenter, double radiusInDegrees, GeometryFactory geometryFactory) {
        String type = location.getType();
        if (type == null) {
            type = "Point";
        }
        switch (type) {
            case "Point":
                return markerMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            case "Circle":
                return circleMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            case "Polygon":
                return polygonMatches(location, searchCenter, radiusInDegrees, geometryFactory);
            default:
                return markerMatches(location, searchCenter, radiusInDegrees, geometryFactory);
        }
    }
    
    private boolean markerMatches(Locations location, Point searchCenter, double radiusInDegrees, GeometryFactory geometryFactory) {
        List<List<Double>> coordinates = location.getCoordinates();
        double lat, lng;
        if (coordinates.isEmpty() || coordinates.get(0).isEmpty()) {
            lat = location.getLat();
            lng = location.getLng();
        } else {
            List<Double> latLng = coordinates.get(0);
            lat = latLng.get(0);
            lng = latLng.get(1);
        }
        Point locationPoint = geometryFactory.createPoint(new Coordinate(lat, lng));
        return locationPoint.isWithinDistance(searchCenter, radiusInDegrees);
    }
    
        private boolean circleMatches(Locations location, Point searchCenter, double radiusInDegrees, GeometryFactory geometryFactory) {
        List<Double> centerLatLng = location.getCoordinates().get(0);
        Point center = geometryFactory.createPoint(new Coordinate(centerLatLng.get(0), centerLatLng.get(1)));
        double localRadiusInDegrees = metersToDegrees(location.getRadius());
        Geometry circle = createCircle(center, localRadiusInDegrees, geometryFactory);
        return circle.intersects(searchCenter.buffer(radiusInDegrees));
    }

    private Geometry createCircle(Point center, double radius, GeometryFactory geometryFactory) {
        int sides = 32;
        Coordinate coords[] = new Coordinate[sides + 1];
        for (int i = 0; i < sides; i++) {
            double angle = ((double) i / (double) sides) * Math.PI * 2.0;
            double dx = Math.cos(angle) * radius;
            double dy = Math.sin(angle) * radius;
            coords[i] = new Coordinate(center.getX() + dx, center.getY() + dy);
        }
        coords[sides] = coords[0];
        LinearRing ring = geometryFactory.createLinearRing(coords);
        Polygon circle = geometryFactory.createPolygon(ring, null);
        return circle;
    }

    private boolean polygonMatches(Locations location, Point searchCenter, double radiusInDegrees, GeometryFactory geometryFactory) {
        List<List<Double>> coordinatesList = location.getCoordinates();
        Coordinate[] coordinates = new Coordinate[coordinatesList.size()];
        for (int i = 0; i < coordinatesList.size(); i++) {
            List<Double> point = coordinatesList.get(i);
            coordinates[i] = new Coordinate(point.get(0), point.get(1)); // Longitude, Latitude
        }
        Polygon polygon = geometryFactory
                .createPolygon(new LinearRing(new CoordinateArraySequence(coordinates), geometryFactory), null);
        return polygon.intersects(searchCenter.buffer(radiusInDegrees));
    }
```

### Documantation

**Explanation:** While I have not yet created inherent documentation, I am in the process of composing a comprehensive user and system manual. This manual will specifically cater to the customers.


# Individual Contributions

## Burak Koçak

### Executive Summary

Throughout the project, I have actively participated in several key developments, contributing to enhancements in both the frontend and backend aspects of our application.

- **Activity Stream:** As a part of back end team, I did major contributions to the design, development, testing and maintaining for the Activity Stream feature.
- **Follower List:** I did major contributions to the Follower list implementation on back end.
- **Like List:** I did implement Like list feautre on back end side.

- **StoryDTO for performance:** To improve performance I added a DTO to back end for faster home page loading.

- **Bug fixes:** I did a lot of bug fixes and refactoring on back end for maintainibility.


### Detailed Contributions

**Note:** Each of the referenced issues includes associated commits. [Requirements](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) for the project are mentioned in the descriptions of each effort. However, specific URLs for these requirements are not individually provided, as they are documented collectively.

#### Activity Stream

**Related Requirements:** 
- [1.1.19](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 
- [1.2.8](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 
- [1.2.21](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 

**Related Issues:**
- [Finalize activity endpoint and provide example request and reponse. #84](https://github.com/SWE574-G3/Living-Stories-App/issues/84)
	- **Code Description:** The activity stream logic and endpoint is finalized with this issue.
- [Add activity count endpoint on back-end #126](https://github.com/SWE574-G3/Living-Stories-App/issues/126)
    - **Code Description:** There was another request for activity stream functionality to imporve its utilization on front end.

#### Like List and Follow List


**Related Issues:**
- [Create liked user list #158](https://github.com/SWE574-G3/Living-Stories-App/issues/158)
    - **Code Description:** Implemented Liked user list which lets users to see who liked a specific story and their followers and story counts.
- [FollowerList Endpoint #171](https://github.com/SWE574-G3/Living-Stories-App/issues/171)
    - **Code Description:** Implemented followerlist user list which lets users to see who liked a specific story and their followers and story counts.

#### Bug fixes
- [Header Search Bug #98](https://github.com/SWE574-G3/Living-Stories-App/issues/171)
    - **Code Description:** There was a issue where when header is given the search was not functioning
- [Fix newflag bug #128](https://github.com/SWE574-G3/Living-Stories-App/issues/128)
    - **Code Description:** new Flag was not functionong correctly for activities. Tis has been fixed.
- [Improve Home page loading performance #124](https://github.com/SWE574-G3/Living-Stories-App/issues/124)
    - **Code Description:** Improved the performance of the loadıing for home page.
### Demo
I implemented activity stream. This was the most challaging piece of code for this project.

'''   

	@GetMapping
    public ResponseEntity<List<Activity>> getActivityStream(HttpServletRequest request){

        Long id = userService.isUserLoggedIn(request);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> followingIds = user.getFollowing().stream().map(User::getId).collect(Collectors.toList());
            List<Activity> activities = new ArrayList<>();
            Date lastDate = user.getLatestSeenActivityTime();

            for (Long followingId : followingIds) {
                List<Activity> activitiesByUserId = activityRepository.findByUserId(followingId);

                activitiesByUserId.forEach(activity -> {
                    if (lastDate != null && !activity.getAction_timestamp().after(lastDate)) {
                        activity.setNewFlag("N");
                    } else {
                        activity.setNewFlag("Y");
                    }
                });
                activities.addAll(activitiesByUserId);
            }
            activities.sort(Comparator.comparing(Activity::getAction_timestamp).reversed());

            if (!activities.isEmpty()) {
                user.setLatestSeenActivityTime(activities.get(0).getAction_timestamp());
                userRepository.save(user);
            }
            return ResponseEntity.ok(activities);
        }

        return ResponseEntity.notFound().build();
    }'''
    
### Pull Request
I made all the commits to the branches thus did not use any Pull requests. I handled this case with merges.

### Issues


| **Issue #** | **Title**                                                     | **Status**             | **Milestone**          | **Assignees**                                  |
|-------------|---------------------------------------------------------------|------------------------|------------------------|------------------------------------------------|
| [#171](https://github.com/SWE574-G3/Living-Stories-App/issues/171) | FollowerList Endpoint backend                                | Closed 3 hours ago     | Milestone 3 Review     | @yavuzsa, @BurakKocak99                         |
| [#159](https://github.com/SWE574-G3/Living-Stories-App/issues/159)   | Modify activity when it is about the my user backend enhancement priority: high | Closed 2 hours ago | Milestone 3 Review                           | @yavuzsa, @BurakKocak99                           |
| [#158](https://github.com/SWE574-G3/Living-Stories-App/issues/158)   | Create liked user list backend enhancement priority: low         | Closed last week        | Milestone 3 Review                           | @yavuzsa, @BurakKocak99                           |
| [#147](https://github.com/SWE574-G3/Living-Stories-App/issues/147)   | Addressing Recommendation Tab Display Issue bug bug-fix frontend priority: high Recommendation-Engine | Closed last week        | Milestone 3 Review                           | @BurakKocak99, @JohnsL-U, @Ali-Hakan              |
| [#142](https://github.com/SWE574-G3/Living-Stories-App/issues/142)   | Add endpoint for fetching follower list with detail info backend enhancement | Closed 2 hours ago |                                               | @yavuzsa, @BurakKocak99                           |
| [#132](https://github.com/SWE574-G3/Living-Stories-App/issues/132)   | Milestone 2 Review Report documentation                          | Closed last month      | Milestone 2 Review                           | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH | 
| [#128](https://github.com/SWE574-G3/Living-Stories-App/issues/128)   | Fix newflag bug backend bug-fix                                  | Closed last month      | Milestone 2 Review                           | @yavuzsa, @BurakKocak99                           |
| [#127](https://github.com/SWE574-G3/Living-Stories-App/issues/127)   | Add new flag for activities backend enhancement                  | Closed last month      | Milestone 2 Review                           | @yavuzsa, @BurakKocak99                           |
| [#125](https://github.com/SWE574-G3/Living-Stories-App/issues/125)   | Improve Recommendation engine performance backend improvement Recommendation-Engine | Closed 3 weeks ago | Milestone 3 Review                           | @BurakKocak99, @JohnsL-U                          |
| [#124](https://github.com/SWE574-G3/Living-Stories-App/issues/124)   | Improve Home page loading performance backend bug improvement    | Closed 4 hours ago     | Milestone 3 Review                           | @yavuzsa, @BurakKocak99                           |
| [#104](https://github.com/SWE574-G3/Living-Stories-App/issues/104)   | Name Similarities of Stored Data for Different Models in Database backend priority: high Recommendation-Engine | Closed on Dec 3, 2023 | Recommendation Engine                  | @BurakKocak99, @JohnsL-U                           |
| [#99](https://github.com/SWE574-G3/Living-Stories-App/issues/99)     | Unable to Fetch User Story Likes backend priority: high Recommendation-Engine | Closed on Dec 3, 2023 | Recommendation Engine                  | @BurakKocak99, @JohnsL-U                           |
| [#98](https://github.com/SWE574-G3/Living-Stories-App/issues/98)     | Header Search Bug bug priority: high                              | Closed last week        | Milestone 3 Review                           | @sananeminli, @yavuzsa, @BurakKocak99, @Ali-Hakan |
| [#93](https://github.com/SWE574-G3/Living-Stories-App/issues/93)     | Review and Provide Feedback on Alternative Recommendation Engine backend improvement priority: high Recommendation-Engine | Closed last month | Recommendation Engine                  | @sananeminli, @yavuzsa, @BurakKocak99              |
| [#91](https://github.com/SWE574-G3/Living-Stories-App/issues/91)     | Determine Database Choice Based on Recommendation Engine Logic architecture backend priority: high Recommendation-Engine | Closed on Nov 29, 2023 | Recommendation Engine          | @yavuzsa, @BurakKocak99, @JohnsL-U                  |
| [#90](https://github.com/SWE574-G3/Living-Stories-App/issues/90)     | Update Backend Service for Correct Flask App URL in Docker Environment architecture backend priority: high Recommendation-Engine | Closed on Nov 27, 2023 | Recommendation Engine          | @yavuzsa, @BurakKocak99, @JohnsL-U                  |
| [#87](https://github.com/SWE574-G3/Living-Stories-App/issues/87)     | Integration Testing for Python Recommendation Engine and Java/Spring Backend API architecture backend priority: high Recommendation-Engine | Closed on Dec 3, 2023 | Recommendation Engine          | @yavuzsa, @BurakKocak99, @JohnsL-U                  |
| [#84](https://github.com/SWE574-G3/Living-Stories-App/issues/84)     | Finalize activity endpoint and provide example request and response. architecture backend enhancement | Closed on Nov 13, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#74](https://github.com/SWE574-G3/Living-Stories-App/issues/74)     | Add Story Post Timestamp architecture backend enhancement      | Closed on Nov 13, 2023 |                                               | @yavuzsa, @BurakKocak99                           |
| [#72](https://github.com/SWE574-G3/Living-Stories-App/issues/72)     | Research Optimal Model for Recommendation Engine architecture backend Recommendation-Engine | Closed on Nov 23, 2023 | Recommendation Engine          | @yavuzsa, @BurakKocak99, @JohnsL-U                  |
| [#71](https://github.com/SWE574-G3/Living-Stories-App/issues/71)     | Record Follow Activity to the Activity table. architecture backend documentation enhancement | Closed on Nov 3, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#70](https://github.com/SWE574-G3/Living-Stories-App/issues/70)     | Record Comment Activity to the Activity table. architecture backend documentation enhancement | Closed on Nov 3, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#69](https://github.com/SWE574-G3/Living-Stories-App/issues/69)     | Record Post Activity to the Activity table. architecture backend documentation enhancement    | Closed on Nov 3, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#68](https://github.com/SWE574-G3/Living-Stories-App/issues/68)     | Record Like activity to the Activity table. architecture backend documentation enhancement    | Closed on Nov 1, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#67](https://github.com/SWE574-G3/Living-Stories-App/issues/67)     | Modify "/activity" endpoint to read from Activity table. architecture backend enhancement improvement | Closed on Nov 13, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#66](https://github.com/SWE574-G3/Living-Stories-App/issues/66)     | Record activities to the Activity table. architecture backend enhancement improvement | Closed on Nov 13, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#65](https://github.com/SWE574-G3/Living-Stories-App/issues/65)     | Identify places in code where actions we count as "Activity" is performed. architecture backend enhancement | Closed on Nov 1, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#64](https://github.com/SWE574-G3/Living-Stories-App/issues/64)     | Create an Activity entity that stores activities of users. architecture backend improvement | Closed on Oct 31, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#46](https://github.com/SWE574-G3/Living-Stories-App/issues/46)     | Release Pre-release Version of the Software backend frontend improvement priority: high | Closed on Nov 1, 2023 | Milestone Review 1                          | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#45](https://github.com/SWE574-G3/Living-Stories-App/issues/45)     | Prepare Milestone Review Report documentation priority: high        | Closed on Nov 2, 2023 | Milestone Review 1                          | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#39](https://github.com/SWE574-G3/Living-Stories-App/issues/39)     | Software Design Documents UML documentation priority: high          | Closed on Oct 30, 2023 | Milestone Review 1                          | @BurakKocak99                                   |
| [#20](https://github.com/SWE574-G3/Living-Stories-App/issues/20)     | Initiate "like" endpoint for activity stream backend                  | Closed on Oct 22, 2023 | Back-End: Finalized Activity Stream Feature | @BurakKocak99                                   |
| [#19](https://github.com/SWE574-G3/Living-Stories-App/issues/19)     | Add a basic endpoint for getting activity stream based on actions of followed users. backend enhancement | Closed on Oct 21, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#18](https://github.com/SWE574-G3/Living-Stories-App/issues/18)     | Decide on how to handle activity stream. backend enhancement         | Closed on Oct 21, 2023 | Back-End: Finalized Activity Stream Feature | @yavuzsa, @BurakKocak99                           |
| [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)       | Getting familiar with the base project. good first issue              | Closed on Oct 23, 2023 |                                              | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)       | Prepare Responsibility Assignment Matrix. documentation priority: high | Closed on Oct 14, 2023 |                                              | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#6](https://github.com/SWE574-G3/Living-Stories-App/issues/6)       | Align with group members on Integration Method for Recommendation Engine architecture priority: high | Closed on Oct 14, 2023 |                                       | @yavuzsa, @BurakKocak99, @JohnsL-U                 |
| [#4](https://github.com/SWE574-G3/Living-Stories-App/issues/4)       | Align with group members on how to handle the UI and mobile application aspect. architecture | Closed on Oct 16, 2023 |                                  | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)       | Align with group members on backend and database technologies to be used for the project. architecture | Closed on Oct 16, 2023 |                              | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |
| [#2](https://github.com/SWE574-G3/Living-Stories-App/issues/2)       | Create custom issue labels.                                         | Closed on Dec 3, 2023 |                              | @sananeminli, @yavuzsa, @BurakKocak99, @JohnsL-U, @Omar4GH |


# Individual Contributions

## Omar Ghamrawi

### Executive Summary

During this project, i was responsible in developing and building the Mobile app with Senan, and General work in Frontend and design whether it's Web App or Mobile.

- **Developed the Mobile App:** 
I led the development of the Mobile app along with Senan, After we started learning all basics of React Nativefrom scratch. And worked on the following:
    - **Created Mockups with Senan** 
    [Mockups](https://github.com/SWE574-G3/Living-Stories-App/wiki/Scenarios-and-Mock%E2%80%90Ups)
    - **Designed Story Card and Improved Feed Page Design** 
Designed Story Cards that are displayed in Home page, Search Page and Profile Page, And improved the Feed Page's Design [Issue#37](https://github.com/SWE574-G3/Living-Stories-App/issues/37),[PR#27](https://github.com/SWE574-G3/Living-Stories-App/pull/27).
    - **Developed and Designed User Profile Page** 
Designed User's Profile Page, displaying their profile info and Stories, along with the ability to Edit their Profile. [Issue#49](https://github.com/SWE574-G3/Living-Stories-App/issues/49),  [Issue#88](https://github.com/SWE574-G3/Living-Stories-App/issues/88)
    - **Developed and Designed Search Page** 
Designed and Developed the Search page, for Story Search, and User Search.
Along with finding a solution to use months and years pickers without a calendar Component for mobile. In addition to getting user's Current Location for the Search. [Issue#96](https://github.com/SWE574-G3/Living-Stories-App/issues/96), [Issue#107](https://github.com/SWE574-G3/Living-Stories-App/issues/107), [Issue#130](https://github.com/SWE574-G3/Living-Stories-App/issues/130)
    - **Designed Comment Card** 
Designed the comment card to be used in Story Page.
    - **Designed Profile/Register Page** 
[Issue#35](https://github.com/SWE574-G3/Living-Stories-App/issues/35), [Issue#36](https://github.com/SWE574-G3/Living-Stories-App/issues/36)
    - **Designed the Story Page** 
Designed the story page, fixing the page's format, colors, icons for seasons, comment section, Author's info and story Content. [Issue#50](https://github.com/SWE574-G3/Living-Stories-App/issues/50) 
    - **Designed and Developed Post Story Page** 
Designed Post story page, Implementing a Rich Text Editor, designing tags addition, with dates selection that i developed in Search Page before, in addition to Adding a photo from Camera or Gallery to the Rich Text Editor's content. [PR#163](https://github.com/SWE574-G3/Living-Stories-App/pull/163)
[Issue#166](https://github.com/SWE574-G3/Living-Stories-App/issues/166)
    - **Implemented Timeline Function and Improved Senan's Page Design** 
Made a link from Search Page's location selection to Timeline page to Display Timeline stories of this location. And Implemented Fixes and Improvements on Senan's Initial Timeline design, including background change on scroll. [PR#164](https://github.com/SWE574-G3/Living-Stories-App/pull/164)
    - **Generall Bug Fixes**
    [Issue#138](https://github.com/SWE574-G3/Living-Stories-App/issues/138),    [Issue#133](https://github.com/SWE574-G3/Living-Stories-App/issues/133),    [Issue#165](https://github.com/SWE574-G3/Living-Stories-App/issues/165),    [Issue#139](https://github.com/SWE574-G3/Living-Stories-App/issues/139)
    - **Debugging Errors on APK Build** 

- **Redesign Web App's Frontend:** I've completely redesigned all the Web App's Frontend, improving on the current design. Changing pages format, input fields, titles and colors
    - **Designed** 
    Story Card, Comment Card, Feed Page, Search Page, Profile Page, Edit Profile, Story Page, Create Story Page, Edit Story Page. [PR#150](https://github.com/SWE574-G3/Living-Stories-App/pull/150), [PR#145](https://github.com/SWE574-G3/Living-Stories-App/issues/145)
    - **Implemented** 
        - Get User's Current Location in Create Story.
        - Follow Author Button in Story Page
        - Compress Uploaded Profile Picture in Profile Page
        - Helped Erhan Design User's Followers List and Story's Likes list

### My Pull Requests
#### Freature/ Mobile Timeline [PR#164](https://github.com/SWE574-G3/Living-Stories-App/pull/164)
I've Created this PR to develop the Timeline Page for mobile inside it, where me and Senan worked in it.
#### Mobile new post story [PR#163](https://github.com/SWE574-G3/Living-Stories-App/pull/163)
I've Created this PR to develop our new Post Story Page for mobile after we decided to recreate it without using WebView, where I've developed and designed the page, then senan added the map locations selections with markers.
#### Feature/Web frontend redesign [PR#150](https://github.com/SWE574-G3/Living-Stories-App/pull/150)
This PR was created so i could work on all the Web App's Frontend design seperately before merging it, where i did all the changes mentioned above about redesigning the frontend.
#### Feature/new post story mobile [PR#78](https://github.com/SWE574-G3/Living-Stories-App/pull/78)
This was created for developing out initial Mobile Post Story Page, where we used WebView to fast the process of having the page ready, but then we changed it all in PR#163 above
#### feat: Design for Pages [PR#27](https://github.com/SWE574-G3/Living-Stories-App/pull/27)
This was created for beginning of the design and adding pages process on mobile.

### Code Reviews
#### Reviewed Senan's code as he reviewed mine during all the PRs mentioned above.
#### Reviewed Erhan's code in [PR#167](https://github.com/SWE574-G3/Living-Stories-App/issues/167)
- In a meeting i've reviewed Erhan's code from this issue, and later on did some fixes and changes due to problems that appeared after build.
    - [Removed Box Component Commit](https://github.com/SWE574-G3/Living-Stories-App/commit/b3b4c6aa24a5bee80fcde14129bcdaea1984c8f7)
A Box component used to display Followers and likes list in Modal was Causing problems when building the WebApp on the Cloud, so i replaced it with a normal Div with styling.
    - [Fix Credentials on Endpoints call Commit](https://github.com/SWE574-G3/Living-Stories-App/commit/5760e0f51ca7ae6803dd80f9ae12e7dfcc6b9d82)
The Endpoint for getting User's Followers and Story Likes list, was throwing error due to not passing credentials with the api call.
    - [Fixed Scrolling Commit](https://github.com/SWE574-G3/Living-Stories-App/commit/e760561384add5f0e5ecad70f53f44438e62d44d)
When the Followers or Likes list gets long, it didnt scroll and kept getting longer, so i added a scrollview on the div that contains the list.

### DEMO
#### Timeline onScroll Design Changes
In Mobile Timeline page, i've worked on the feature of Detecting which story is in the middle of the screen when the user is scrolling horizontally, and based on the season of that story, it's background leaf is different, and the whole page's background GIF changes to correspond the season.

![image](https://github.com/SWE574-G3/Living-Stories-App/assets/103641847/4b01069a-9133-4b80-9676-fa59e6377ce5)![image](https://github.com/SWE574-G3/Living-Stories-App/assets/103641847/847e4818-84bd-41be-a1b6-74f4c29f0939)

#### Created Months and Years Pickers manually
In Mobile Search Page, we found a calendar component for choosing a full date, but couldnt find a component for choosing only month and year or only year (some component were breaking the apk build). So i had to manually create a list of months, and a list of auto generated Years, and on selecting each individually i combine them together in the needed format for the API search endpoint.
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/103641847/0d9f0c32-6163-47cc-8ad3-2210d1cc77a5)




### Issues Table


#### Created by Me

| Issue URL                                         | Issue Title                                         |
| -------------------------------------------------- | --------------------------------------------------- |
| https://github.com/SWE574-G3/Living-Stories-App/issues/139 | Add Ask Permission for Gallery and Camera access for mobile                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/167 | Add Followers and Likes List on Web App                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/145   | Redesign Web App Frontend                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/138   | Fix Follow Button Update on User Profile                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/107 | Feature: Create User Search                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/89 | Add Edit Story Feature                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/88   | Add Edit Profile Feature                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/50   | Improve Design of Story Page                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/49 | Improve Design of My Profile Page                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/33 | Create Feed Page with Basic Functions                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/32   | Create My Profile Page with Basic Functions                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/31   | Create Post Story Page with Basic Functions                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/49 | Improve Design of My Profile Page                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/30 | Create Story Page with Basic Functions                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/25   | Create Mobile Screens/Pages                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/24   | Implement the Navigation system for the Mobile App                               |

#### Assigned to Me

| Issue URL                                         | Issue Title                                         |
| -------------------------------------------------- | --------------------------------------------------- |
|https://github.com/SWE574-G3/Living-Stories-App/issues/139    | Add Ask Permission for Gallery and Camera access for mobile
| https://github.com/SWE574-G3/Living-Stories-App/issues/167 | Add Followers and Likes List on Web App                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/145 | Redesign Web App Frontend                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/140  | Profile images uploaded by user should be reduced in size                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/138   | Fix Follow Button Update on User Profile                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/133 | Correct the tag scroll bug                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/132 | Milestone 2 Review Report                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/131   | Create timeline screen                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/130   | Add current location button to the search screen                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/129 | Add current location button to the story create screen                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/107 | Feature: Create User Search                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/96   | Search possible datetime picker for search screen                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/89   | Add Edit Story Feature                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/88 | Add Edit Profile Feature                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/76 | Add story create page to the mobile                           |
| https://github.com/SWE574-G3/Living-Stories-App/issues/50   | Improve Design of Story Page                               |
| https://github.com/SWE574-G3/Living-Stories-App/issues/49   | Improve Design of My Profile Page
|https://github.com/SWE574-G3/Living-Stories-App/issues/46    | Release Pre-release Version of the Software
|https://github.com/SWE574-G3/Living-Stories-App/issues/45    | Prepare Milestone Review Report
|https://github.com/SWE574-G3/Living-Stories-App/issues/37    | Improve design of Story Feed page
|https://github.com/SWE574-G3/Living-Stories-App/issues/36    | Improve design of Resgister page
|https://github.com/SWE574-G3/Living-Stories-App/issues/35    | Improve design of Login page
|https://github.com/SWE574-G3/Living-Stories-App/issues/33    | Create Feed Page with Basic Functions
|https://github.com/SWE574-G3/Living-Stories-App/issues/32    | Create My Profile Page with Basic Functions
|https://github.com/SWE574-G3/Living-Stories-App/issues/31    | Create Post Story Page with Basic Functions
|https://github.com/SWE574-G3/Living-Stories-App/issues/30    | Create Story Page with Basic Functions
|https://github.com/SWE574-G3/Living-Stories-App/issues/29    | Remove TailWind
|https://github.com/SWE574-G3/Living-Stories-App/issues/23    | Implementing a Homepage Navigation Bar
|https://github.com/SWE574-G3/Living-Stories-App/issues/9     |Getting familiar with the base project.
|https://github.com/SWE574-G3/Living-Stories-App/issues/7    | Prepare Responsibility Assignment Matrix.
|https://github.com/SWE574-G3/Living-Stories-App/issues/4    |Align with group members on how to handle the UI and mobile application aspect.
|https://github.com/SWE574-G3/Living-Stories-App/issues/3    |Align with group members on backend and database technologies to be used for the project.
|https://github.com/SWE574-G3/Living-Stories-App/issues/2    |Create custom issue labels.


### Documentation
- I've Worked on my Individual contribution for every Milestone.
- Contributed generally in providing clear info to the team, on any features I've built, for Documentation.
- Contributed in taking Meeting notes for Mobile meetings with Senan.
- Recorded Video DEMOs for Web App and Mobile App.

### Challenges
- Getting familiar with React Native at the start of the project.
- Not using public libraries for ready designed components for mobile, since most of them caused errors when building the APK
- Figuring out errors on the APK build, where i had to Log android emulator.
- Fully understanding existing code built of the SWE 573 Project we decided to work on (Senan's Living Stories).


## Individual Contribution: Cansel Uzun
### Executive Summary

- **Recommendation Engine Development**: I established the Flask application and integrated it with a PostgreSQL database, laying the foundation for the recommendation engine. I implemented text processing using BeautifulSoup and TF-IDF Vectorization, followed by K-Means clustering to group stories by content similarity. The core of the engine involved developing personalized recommendation logic based on user-specific metrics like label similarity and user interactions. I also tackled the cold start problem by initially recommending popular stories to new users, ensuring early engagement. This dynamic recommendation system continuously adapts to changing user preferences, maintaining relevance and personalization.
- **Wiki and Documentation:** I played a key role in creating and maintaining the project Wiki, especially for meeting notes, ensuring that all team communications and decisions were properly documented and accessible.
- **Communication and Planning:** I developed the Communication Plan and Responsibility Assignment Matrix, which streamlined our team coordination and clarified roles and responsibilities.
- **UI Feedback and Testing:** My manual testing of the app and direct feedback to the frontend team significantly improved the UI, enhancing user experience.
- **Milestone Reports:** I contributed to writing the general parts of the first two milestone reports, providing a comprehensive overview of our project's progress and achievements.

### Related Functional Requirements

| Requirement ID | Description | Status |
|----------------|-------------|--------|
| 1.1.13 | The users shall receive story or user recommendations based on their activity and interests. | Completed |

### Issues

| Issue Number | Title | Created by me | Assigned to me | URL |
|--------------|------------|---------------|----------------|-----|
| #1 | Each instance of a meeting note should have its own page under "Meeting Notes" | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/1) |
| #2 | Create custom issue labels | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/2) |
| #3 | Align with group members on backend and database technologies to be used for the project | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/3) |
| #4 | Align with group members on how to handle the UI and mobile application aspect | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/4) |
| #6 | Align with group members on Integration Method for Recommendation Engine | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/6) |
| #7 | Prepare Responsibility Assignment Matrix | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/7) |
| #8 | Write short descriptions for Main Tasks in the Wiki | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/8) |
| #9 | Getting familiar with the base project | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/9) |
| #42 | Complete the Software Requirements Specification Document | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/42) |
| #43 | Create Project Plan, Communication Plan, and Responsibility Assignment Matrix | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/43) |
| #44 | Maintain Weekly Reports and Archive Meeting Notes | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/44) |
| #45 | Prepare Milestone Review Report | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/45) |
| #46 | Release Pre-release Version of the Software | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/46) |
| #47 | Create Branch for Recommendation Engine Development | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/47) |
| #72 | Research Optimal Model for Recommendation Engine | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/72) |
| #87 | Integration Testing for Python Recommendation Engine and Java/Spring Backend API | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/87) |
| #90 | Update Backend Service for Correct Flask App URL in Docker Environment | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/90) |
| #91 | Determine Database Choice Based on Recommendation Engine Logic | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/91) |
| #99 | Unable to Fetch User Story Likes | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/99) |
| #103 | KeyError: 'like_count' | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/103) |
| #104 | Name Similarities of Stored Data for Different Models in Database | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/104) |
| #108 | KeyError for 'like_count' in DataFrame Operations | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/108) |
| #110 | Duplicate Story Recommendations | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/110) |
| #111 | Backend and Recommendation Engine Would Not Run on Docker | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/111) |
| #115 | API Endpoint Return Type Change Request | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/115) |
| #118 | Improvements on Recommendation Engine | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/118) |
| #123 | Fix Data Manipulation Issues in Recommendation Engine | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/123) |
| #125 | Improve Recommendation engine performance | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/125) |
| #132 | Milestone 2 Review Report | ✅ | | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/132) |
| #134 | Parse rich text data from story to get only content without media file | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/134) |
| #147 | Addressing Recommendation Tab Display Issue | | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/147) |
| #154 | Enhance Story Recommendation System with Explanation Feature | ✅ | ✅ | [Link](https://github.com/SWE574-G3/Living-Stories-App/issues/154) |

### Pull Requests

| Pull Request | Title                                           | Created by me | Reviewed by me |
|--------------|-------------------------------------------------|---------------|----------------|
| #155             | Implement Recommendation Explanation Feature for Issue #154 | ✅             |                |
| #137             | Add Project Completion Strategy section         | ✅             |                |
| #135             | Add Milestone 2 Review Report                   | ✅             |                |
| #73             | Merge reports Folder for Milestone 1            | ✅             |                |
| #174             | Merge branch 'Mobile' into 'Main'               |               | ✅              |
| #136            | Update m2_group3.md                             |               | ✅              |
| #120            | Comprehensive Evaluation of Project Progress: Milestone 2 |               | ✅              |

### Explanation of the code

1. **Imports and Flask Setup**
- **Flask-related imports**: `Flask` to create the Flask app, `request` to access request data, and `jsonify` to convert Python dictionaries to JSON responses.
- **Data manipulation tools**: `pandas` (as `pd`) and `numpy` (as `np`) are used for handling and processing data.
- **PostgreSQL adapter**: `psycopg2` is used for connecting to and executing queries on a PostgreSQL database.
- **Machine Learning tools**: `TfidfVectorizer` for transforming text data into TF-IDF feature vectors, `KMeans` for clustering, and `silhouette_score` for evaluating clustering performance.
- **Cross-Origin Resource Sharing (CORS)**: `flask_cors` allows the server to accept requests from different origins, which is essential for web applications.
- **HTML parsing**: `BeautifulSoup` from `bs4` for parsing HTML content and extracting text.

2. **Database Connection and Data Fetching**
- **Database Configuration**: A dictionary `db_config` holds the connection parameters for the PostgreSQL database.
- **Connection Function**: `connect_to_database` establishes a connection to the database using the configuration.
- **Data Retrieval Functions**: Functions like `fetch_data`, `fetch_users`, etc., are defined to retrieve different types of data from the database. They use pandas' `read_sql_query` function to execute SQL queries and return the results as pandas DataFrames.

> - Issue #91 ([Determine Database Choice Based on Recommendation Engine Logic](https://github.com/SWE574-G3/Living-Stories-App/issues/91)): Related to decisions about the database structure and schema.

3. **Data Preprocessing and Clustering**
- **Text Extraction**: `extract_text_from_html` uses BeautifulSoup to parse HTML content and extract text from paragraph tags (`<p>`).
- **Story Data Fetching**: `fetch_stories` fetches story data and processes HTML content to plain text.
- **TF-IDF Vectorization**: `vectorize_stories` applies TF-IDF vectorization to the text data of stories.
- **Clustering**: `cluster_stories` uses K-means clustering on the TF-IDF vectors. It also determines the best number of clusters using silhouette scores, a measure of how similar an object is to its own cluster compared to other clusters.

> - Issue #72 ([Research Optimal Model for Recommendation Engine](https://github.com/SWE574-G3/Living-Stories-App/issues/72)): Pertains to machine learning tools and clustering methods used in this section.
> - Issue #104 ([Name Similarities of Stored Data for Different Models in Database](https://github.com/SWE574-G3/Living-Stories-App/issues/104)): Could involve data preprocessing steps for data consistency.

4. **Recommendation Logic**
- **Top Liked Stories**: `fetch_most_liked_stories` returns stories sorted by their like counts.
- **Similarity Calculations**: 
    - `calculate_label_similarity` computes how similar a story's labels are to the labels of stories liked by a user.
    - `calculate_location_similarity` compares story locations to locations of stories liked by a user.
    - `calculate_followed_users_likes_scores` checks if stories are liked by users followed by the given user.
- **Story Recommendation**: `recommend_stories` aggregates these similarity scores to recommend stories. It uses a combination of label similarity, location similarity, and likes from followed users. The function also handles user preferences by considering stories in the user's preferred content cluster.

> - Issue #6 ([Align with group members on Integration Method for Recommendation Engine](https://github.com/SWE574-G3/Living-Stories-App/issues/6)), #45 ([Prepare Milestone Review Report](https://github.com/SWE574-G3/Living-Stories-App/issues/45)), #125 ([Improve Recommendation engine performance](https://github.com/SWE574-G3/Living-Stories-App/issues/125)), and #147 ([Addressing Recommendation Tab Display Issue](https://github.com/SWE574-G3/Living-Stories-App/issues/147)): All related to improving the recommendation system.
> - Issue #154 ([Enhance Story Recommendation System with Explanation Feature](https://github.com/SWE574-G3/Living-Stories-App/issues/154)): Involves refining the recommendation logic.

5. **Flask Routes and Application Logic**
- **Recommendation Endpoint (`/recommendations`)**: 
    - It retrieves recommendations based on the provided user ID.
    - Handles the cold start problem by recommending popular stories to new users.
    - For regular users, it offers personalized recommendations based on their interactions and preferences.

- **User Interaction Tracking**: The route calculates the total number of interactions (likes, comments, follows, reads) to identify new users (for the cold start scenario).
- **Error Handling**: Includes checks for missing user IDs and non-existent users.

> - Issue #87 ([Integration Testing for Python Recommendation Engine and Java/Spring Backend API](https://github.com/SWE574-G3/Living-Stories-App/issues/87)): Concerns the integration and functioning of the entire Flask application.
> - Issue #99 ([Unable to Fetch User Story Likes](https://github.com/SWE574-G3/Living-Stories-App/issues/99)): Related to user interaction tracking and likes retrieval.

### Challanges

**Data Structures and Pandas Challenges**:
   - Difficulties in manipulating Pandas data structures, particularly with Series and DataFrames conversions, and dealing with `SettingWithCopyWarning` during slicing.

**Error Handling, Debugging, and Variable Scopes**:
   - Challenges in debugging issues like `UnboundLocalError` and `KeyError`, pointing to complexities in managing variable scopes.

**Data Flow in Recommendation Systems**:
   - Ensuring consistent data type and structure in the `recommend_stories` function and combining different recommendation criteria.

**Flask Application Structure and Routing**:
   - Integrating recommendation logic within Flask's routing and handling request parameters and JSON responses correctly.

**Database Interaction and Data Retrieval**:
   - Managing database connections using psycopg2 and optimizing data retrieval for performance.

**Cold Start Problem in User Recommendations**:
   - Difficulty in providing personalized recommendations to new users with no interaction history.

**Dynamic User Interaction Tracking**:
   - Capturing various user interactions to accurately reflect preferences.

**Content-Based Clustering for Recommendations**:
   - Meaningful grouping of stories for content-based recommendations.

### Documentation

1. **Wiki Home Page**:
   - The central hub for all project-related documentation. It offers an overview and easy navigation to various documentation sections.
   - [Wiki Home Page](https://github.com/SWE574-G3/Living-Stories-App/wiki)

2. **Communication Plan**: 
   - Outlines strategies and protocols for effective communication among team members.
   - [Communication Plan](https://github.com/SWE574-G3/Living-Stories-App/wiki/Communication-Plan)

3. **Responsibility Assignment Matrix (RAM)**:
   - Provides a detailed breakdown of responsibilities assigned to each team member, guiding individual roles and accountability.
   - [Responsibility Assignment Matrix](https://github.com/SWE574-G3/Living-Stories-App/wiki/Responsibility-Assignment-Matrix-(RAM))

4. **Meeting Notes**:
   - Documents discussions, decisions, and action items from team meetings, crucial for tracking progress and ensuring team alignment.
   - [Meeting Notes](https://github.com/SWE574-G3/Living-Stories-App/wiki/Meeting-Notes)

5. **Milestones**:
   - Documents significant phases and achievements in the project lifecycle, detailing the progress and goals met at each stage.
   - [Milestones](https://github.com/SWE574-G3/Living-Stories-App/milestones?state=closed)
# Individual Contributions

## Erhan Yaşar

### Executive Summary

Throughout the project, I have focused on documentation, taking notes for the meetings and classes, and testing for web application, mobile application and recommendation engine.

- **Documentation:** Thorough the semester, I took most of the meeting notes and shared with our discord group and wiki collaborating with Cansel.
- **Initial mock-ups for mobile:** At the start of the semester, I create 9 mobile pages using figma. Senan and Omar upgrade them with better images. Added scenario for these images.
- **System testing:** I created a set of 10 users and 20 stories on the web app to test the performance of both application and recommendation engine. Some of the improvements are done after these test such as reducing file size of profile pictures due to heavy load on system.
- **End-user Web Application Testing:** I created 22 test cases using Selenium IDE to test the web application to test the changes of web UI much faster.
- **Follower List,Like List:** I did the web front-end part of the follower list and like list.
- **First version of User Manual:** I took new screenshots for both mobile and web application and add them to the Senan's existing user manual. Ali Hakan finalized it with fresh new instructions.


### Detailed Contributions

#### Like List and Follow List

**Related Requirements:** 

- [1.1.12](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 

**Related Issues:**
- [Add Followers and Likes List on Web App #167](https://github.com/SWE574-G3/Living-Stories-App/issues/167)

    - **Code Description:** Implemented follower list and story likes list for the web application which lets users to see who liked a specific story and who are the followers of a user.

#### Selenium tests of web application

**Related Issues:**
- [Web page UI testing #168](https://github.com/SWE574-G3/Living-Stories-App/issues/198)
	- **Code Description:** Commited code includes ".side" file which lets user the test the web application with written test cases. This helps the developer who made changes to see if he/she break something or not much faster.

#### Generated synthetic data to test the performance of the system

**Related Issues:**
- [Create Data for Testing Recommendation Engine Performance #92](https://github.com/SWE574-G3/Living-Stories-App/issues/92)
	- **Description:** Created a set of 10 users and 20 stories with different dates and location on the web app to test the performance of both application and recommendation engine.

#### Mock-ups and scenarios

- [Create Mock-Up pages #15](https://github.com/SWE574-G3/Living-Stories-App/issues/15)
    - **Description:** Created 9 mobile images using figma and upload it to wiki.
- [Add scenarios to mock-ups #40](https://github.com/SWE574-G3/Living-Stories-App/issues/40)
    - **Description:** Created a scenario for the updated mock-ups

    
### Demo
I implemented the followers list and story likes for front-end web application. Using new technologies like react-modal, react-cards and tailwind was a great challange and great experience for me.

![Screenshot 2024-01-03 114101](https://github.com/SWE574-G3/Living-Stories-App/assets/115476700/c6582209-7b3a-45ef-bb08-fe9c1807f849)


'''   

	  <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box className="w-fit border-customGreen border-solid border-3 absolute top-1/2 left-1/2 bg-green-50 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 shadow-lg p-4">
                              <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-black md:text-3xl lg:text-4xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                  {user.name}'s
                                </span>{" "}
                                Followers
                              </h1>
                              <div>
                                {followerList &&
                                  followerList.reverse().map((user, index) => (
                                    <Card
                                      sx={{
                                        maxWidth: 350,
                                        minWidth: 300,
                                        width: "100%",
                                        height: "100%",
                                      }}
                                      className="shadow-md mx-auto m-4 h-fit transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                    >
                                      <div className="p-4">
                                        <Link to={`/user/${user.name}`}>
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                              <Avatar
                                                sx={{ width: 75, height: 75 }}
                                                alt={user.name}
                                                className="mr-2"
                                              />
                                              <span className="text-black text-base font-semibold">
                                                {user.name}
                                              </span>
                                            </div>
                                            <p className="text-black text-sm mb-2">
                                              <HistoryEduIcon
                                                fontSize="large"
                                                className="mx-1"
                                              />
                                              {user.stories?.length}
                                              <PeopleIcon
                                                fontSize="large"
                                                className="mx-1"
                                              />
                                              {user.followers?.length}
                                            </p>
                                          </div>
                                        </Link>
                                      </div>
                                    </Card>
                                  ))}
                              </div>
                            </Box>
                          </Modal>
                          <PeopleIcon
                            fontSize="large"
                            className="cursor-pointer hover:text-blue-500"
                            onClick={handleOpen}
                          />{" "}
                          {user.followers.length}
    
### Pull Request
All the commits are done by me does not required a pull request. I took part of the final merge in our final meeting.

### Issues

| Issue Number | Issue Name                                                   | Assigned By   | Assigned To                                         |
|--------------|--------------------------------------------------------------|---------------|-----------------------------------------------------|
| [#168](https://github.com/SWE574-G3/Living-Stories-App/issues/168) | Web page UI testing frontend UAT                             | erhan-yasar   | Closed 2 days ago                                   |
| [#167](https://github.com/SWE574-G3/Living-Stories-App/issues/167) | Add Followers and Likes List on Web App frontend improvement | Omar4GH       | Closed 2 days ago                                   |
| [#145](https://github.com/SWE574-G3/Living-Stories-App/issues/145) | Redesign Web App Frontend                                    | Omar4GH       | Closed last week                                    |
| [#132](https://github.com/SWE574-G3/Living-Stories-App/issues/132) | Milestone 2 Review Report documentation                      | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#92](https://github.com/SWE574-G3/Living-Stories-App/issues/92)   | Create Data for Testing Recommendation Engine Performance   | JohnsL-U      | erhan-yasar                                         |
| [#46](https://github.com/SWE574-G3/Living-Stories-App/issues/46)   | Release Pre-release Version of the Software                 | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#45](https://github.com/SWE574-G3/Living-Stories-App/issues/45)   | Prepare Milestone Review Report documentation               | JohnsL-U      | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#44](https://github.com/SWE574-G3/Living-Stories-App/issues/44)   | Maintain Weekly Reports and Archive Meeting Notes           | JohnsL-U      | JohnsL-U, erhan-yasar                              |
| [#40](https://github.com/SWE574-G3/Living-Stories-App/issues/40)   | Add scenarios to mock-ups                                   | erhan-yasar   | erhan-yasar                                         |
| [#16](https://github.com/SWE574-G3/Living-Stories-App/issues/16)   | Share the missing meeting notes and agenda documentation     | JohnsL-U      | erhan-yasar                                         |
| [#15](https://github.com/SWE574-G3/Living-Stories-App/issues/15)   | Create Mock-Up pages                                         | erhan-yasar   | erhan-yasar                                         |
| [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)     | Getting familiar with the base project                       | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)     | Prepare Responsibility Assignment Matrix                      | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#4](https://github.com/SWE574-G3/Living-Stories-App/issues/4)     | Align with group members on UI and mobile app aspect         | yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)     | Align with group members on backend and database technologies| yavuzsa       | sananeminli, yavuzsa, BurakKocak99, JohnsL-U, Omar4GH |
| [#2](https://github.com/SWE574-G3/Living-Stories-App/issues/2)     | Create custom issue labels                                   | yavuzsa       | Closed on Dec 3, 2023                               |


### Documentation
- I've gathered meeting notes for most of the group meetings and classes and shared them in discord group page. Shared some of meeting notes within group's wiki page collaborating with Cansel.
- Created mock-up pages and scenario.
- I've Worked on my Individual contribution for every Milestone.
- Gathered new screenshots for both mobile and web for User Manual.

### Challenges
- Most difficult challenge was balancing work and school while living away from home for the half of the semester.
- Repeating SWE73 class with this class at the same semester.
- Being not experienced as other team members, trying to catch up to them was exhausting for me.
- Trying to understand new technologies used in the project.
- Repeatedly enter information to test the system.


