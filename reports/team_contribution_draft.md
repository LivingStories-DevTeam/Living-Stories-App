# Living Stories
#### Members: Senan Eminli, Burak Koçak, Cansel Uzun, Ali Hakan Özen, Salih Yavuz, Erhan Yaşar

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


### Project Overview
In order to satisfy the requriments of this project, we needed to develop a fully functioning web application which is for sharing stories. The stories should be location, date and tag based with other supportive functionalities. We have delivered an web application with all the capabilities to satisfy the requirements. It lets user to interact with each other, share stories and interact wit hother stories. The other requirement to be delivered was to have an functional mobile applicaiton. We have delivered the mobile application with all the requirements specified. Also, we utilized the benefits of mobile application like camera and live location. Lastly, we wnated to build a recommendation engine. It needed use different aspects of stories like labels, locations, content similiarty and such. We have also delivered a fully functioning transparent recommendation engine which utilizes the location, labels, user interactions, and content similiarty. We also wanted to keep all of the projected structure in Github, at the and, we have github page with multiple branches for multiple development efforts.

In summary we have delivered the following:

-  Fully functioning web application
-  Mobile applicaiton
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

### System Manual
#### Requirements
- Git for pulling the code
- Docker for running the web application manually
- Android for mobile applicaiton

#### Installation instructions

- Clone the repository into your local using "**git clone https://github.com/SWE574-G3/Living-Stories-App.git**" command.
- Open the **Living-Stories-App** directory
- Run command "**docker-compose -f docker-compose-deploy.yml build**"
- After everything is done run command "**docker-compose -f docker-compose-yml up -d**". This will start the application in your device. You can the status from Docker desktop too.


### User Manual

[User Manual](https://github.com/SWE574-G3/Living-Stories-App/blob/reports/reports/user_manual.md)

### Test Results

#### Backend Service Unit Tests:

![image](https://github.com/SWE574-G3/Living-Stories-App/assets/64078926/9edc270d-4636-42aa-9d22-cb881840ca25)

Final coverage is seen in the screenshot above.
The percentages for each class are Class Coverage, Method Coverage and Line Coverage respectively.

StoryService has a lot of functionality in a singe service due to new requirements which makes it hard to test unit by unit.
Tried to cover core functionalities (of stories) as much as possible.
Consider splitting StoryService in the future.


#### Recommendation Engine Unit Tests:

#### Selenium Tests:

#### Manual Tests:

Every team member tested the functionalties that we have implemented in the production environment with real users. 
No serious bugs have been observed so far in the current state of the project.

# Individual Contributions
## SANAN EMINLI

## Contrubitions
Through this project, I took on the task of creating a mobile app from scratch. This implies that I have made numerous essential contributions to the project. However, this list will highlight the most influential and challenging ones. Additionally, the issues include commits, allowing the reader to explore commits directly from the issue.

* **Create organization:** Copying my older project to the organization and creating necessary files and branches for developing the mobile app inside the repository 
    * **Issues:**  [#5](https://github.com/SWE574-G3/Living-Stories-App/issues/5), [#21](https://github.com/SWE574-G3/Living-Stories-App/issues/21), [#22](https://github.com/SWE574-G3/Living-Stories-App/issues/22) 
    
    

* **Creating the mobile infrastructure:** I have created important React Native folders and also implemented authentication, which is the most fundamental thing in the social media mobile app. This helps the app to have JWT authentication for user login and registration. 
    * **Issues:** [#26](https://github.com/SWE574-G3/Living-Stories-App/issues/26), [#29](https://github.com/SWE574-G3/Living-Stories-App/issues/29), [#34](https://github.com/SWE574-G3/Living-Stories-App/issues/34)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.18, 1.2.19, 1.2.20

* **Creating navigation in mobile app**: Creating navigation inside the mobile app using React Native Navigation. This helps in changing screens and having a bottom tab bar.  
    * **Issues:** [#24](https://github.com/SWE574-G3/Living-Stories-App/issues/24), [#25](https://github.com/SWE574-G3/Living-Stories-App/issues/25) 

* **Created main screens for mobile app:** Creating *post story, story page, my profile, feed screen* with basic functionalities like API calls and data fetching. These screens had design changes afterwards.
    * **Issues:**  [#30](https://github.com/SWE574-G3/Living-Stories-App/issues/30), [#31](https://github.com/SWE574-G3/Living-Stories-App/issues/31), [#32](https://github.com/SWE574-G3/Living-Stories-App/issues/32), [#33](https://github.com/SWE574-G3/Living-Stories-App/issues/33) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.16

* **Adding a map to the story page:** In here, I have added a map to the story page. Users can see the map and marker on top of the screen where stories took place. Map located on top of the story so user can see much more clearly. 
    * **Issues:** [#38](https://github.com/SWE574-G3/Living-Stories-App/issues/38)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.17, 1.2.13

* **Like Story:** Added like button component to the code. When user press it it will send API request that user liked the story. Afterwards like updated. 
    * **Issues:** [#80](https://github.com/SWE574-G3/Living-Stories-App/issues/80)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.2.6

* **Comment Story:** Added commenting on a story functionality to the app. When user write a comment code will send user input text to the backend and comments array inside story will be uptaded. 
    * **Issues:** [#82](https://github.com/SWE574-G3/Living-Stories-App/issues/82)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements)1.2.6

* **Search:** I have created an initial search screen and added necessary libraries and API calls for further development. 
    * **Issues:** [#94](https://github.com/SWE574-G3/Living-Stories-App/issues/94) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.5, 1.1.6, 1.1.7, 1.1.8, 1.1.9, 1.1.10, 1.1.11
 
* **Location selection for story create and search:** I have added map selection to the search and create story. I created two seperate map screens for each purpose. I used pop up screen for rendering the map. When user select locatios alert is shown that indicates location selection was successiful. User can press OK button pop up screen to close.  Also added getting the user's location from the device and its user permissions. When user press get my location it is getting user's device location. 
    * **Issues:** [#95](https://github.com/SWE574-G3/Living-Stories-App/issues/95), [#97](https://github.com/SWE574-G3/Living-Stories-App/issues/97) 
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.9, 1.2.20

* **Activity Stream:** I have created an activity stream screen and button on top th e feed. When new activity happens backend send the number of new activities and I show the number of new activites on top of button. When user press the bell icon to go activity new activities will shown red dot on top of them. 
    * **Issues:** [#100](https://github.com/SWE574-G3/Living-Stories-App/issues/100)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.19, 1.2.21

* **Initial timeline:** Created an initial timeline page with basic design and functionality with endpoints and routes.Added falling leaf animation to the view. 
    * **Issues:** [#131](https://github.com/SWE574-G3/Living-Stories-App/issues/131)
    * [**Related Requirements:**](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements) 1.1.18

* **Follower list:** Added a follower list to the profile page. When user press to the followers button can see the which user following the particular user. 
    * **Issues:**  [#156](https://github.com/SWE574-G3/Living-Stories-App/issues/156) 

* **Like List:** Added a liked user list to the story page. Users can see which users liked particular story. 
    * **Issues:**  [#160](https://github.com/SWE574-G3/Living-Stories-App/issues/160) 

 
 ### Important Bug fixes and code improvements
 
* **Solving case-sensitive email issue:** Before the solution users can not log in their accounts because emails stored in lower case on the database and it caused error. Solved it by converting all input string to the lowercase.
    * **Issues:**   [#48](https://github.com/SWE574-G3/Living-Stories-App/issues/48)  
    * [see commit](https://github.com/SWE574-G3/Living-Stories-App/commit/ceecd33d4b415ee82fccc81be9364761987bb237)

* **Solving radius problem on search:** Radius was stored in meters on search map screen. Solving this bug with dividing meters value by 1000 to convert meter to kilometer. Because in backend we are calculating it with kilometers.  
    * [see commit](https://github.com/SWE574-G3/Living-Stories-App/commit/fdcad3dd6219d71f98b0559f4af9174aa8d43187)

* **Creating native edit story instead of webview:** We initiallty make edit story on mobile webview. But this cause several issues like increased loading time and not responsive user interface. Therefore we removed the webview and add native edit story screen. 
    * [See commit](https://github.com/SWE574-G3/Living-Stories-App/commit/08a545da717e4de6f903dd77a7548206f4ef4ee8)



* **Modify the post story endpoint to be compatible with the advanced post story endpoint:** We used old create story endpoint for creating stories. And this was causing some problems like not having required locations field for timeline. That is why we have changed the endpoint and add new field for creating stories.  
    * **Issues:**  [#165](https://github.com/SWE574-G3/Living-Stories-App/issues/165) 
    *  [see commit](https://github.com/SWE574-G3/Living-Stories-App/commit/e6d8eacf44b1af9adf5507037a88ed63037b26be)

* **Major UI improvements:** Changing design of the search and activity button, feed tab, add header for search screens. [see commit](https://github.com/SWE574-G3/Living-Stories-App/commit/07099e7939dba8c2214eb7e89589801889167668)

 
 

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



## Assing to Me
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


## Executive Summary
I have provided necessary information for my project and assisted the corresponding teams in understanding both the code and database design. From the outset, I've helped form teams aligned with their areas of interest and abilities. In the mobile team, I was responsible for choosing the framework for our project, opting for React Native based on our team members' skillsets. Additionally, I collaborated with teammates, making changes and ensuring a well-crafted UI.

## Demo
This is the map selection for creating stories. Location selection can be accomplished in various ways, such as redirecting the user to another screen. Previously, we followed this approach where users would select locations and then return to the story creation page. However, in order to enhance the user experience, I have implemented a modal – a pop-up screen.

Within this modal, when the user presses on a location, it is selected. I have personally designed the map inside the modal. Upon selecting a location, the app retrieves information about that place, including latitude, longitude, the name of the location, city, and country. This data is then stored in an array, and the names of the locations are presented to the user.

To further empower users, I've added a button for deleting a location in case the user wishes to remove it. Additionally, there's a 'Get My Location' functionality on this page. When the user presses the 'Get My Location' button, the app fetches the user's geolocation information and displays it. This feature allows users to effortlessly select and create a story based on their current location.

### Challanges
During the implementation, the primary challenge was designing the inside of the modal. Since modal sizes can vary from one phone to another, and button positions may shift accordingly, I had to use percentages from the edges of the modal screen for a responsive layout. Additionally, retrieving the location city name posed a challenge. The inconsistency arises because sometimes it is referred to as the city, while in other instances, it is labeled as administrative area level 2. Consequently, I needed to iterate through each detail to identify the city accurately.



## Documentation 
I collaborate with my teammate, Omar, to document mobile meeting notes. In addition to that, I am responsible for drafting various mobile requirements.

## Pull requests
[#59](https://github.com/SWE574-G3/Living-Stories-App/pull/59): Adding mobile development folder and codes to the main. We have tested the code in the test branch and then merged it into the main branch.
[#63](https://github.com/SWE574-G3/Living-Stories-App/pull/63): Adding executable living_stories.apk file to the main repository.  I added apk deliverables to the main branch.

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



