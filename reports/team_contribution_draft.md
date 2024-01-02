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

### Test Results

