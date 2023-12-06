
# SWE 574 MILESTONE 2 REPORT

## Project Status

### Overview:
The "Living Stories" platform, originally a web app for sharing and discovering memories, has significantly evolved. Now also offered as a mobile app with a focus on user-friendly features. It now includes text, photos, and file uploads, supported by functionalities such as search, like, follow, geo-location, commenting, activity stream with notifications, timeline and a recommendation engine!

### Recent Release Description:
**Living Stories - Milestone 2 Release**:<br>
The latest release marks a pivotal transition of "Living Stories" into the mobile domain. Available on iOS and Android, it offers a seamless memory-sharing experience. The robust build, powered by React Native, ensures a smooth user interface and functionality.

### Future Prospects:
The future roadmap includes further enhancements to the mobile app and recommendation engine, especially focusing on user experience through thorough testing. Continuous improvements and updates are planned for both the web and mobile platforms as well.

### Milestone Updates:
#### Milestone 2: **Mobile App / Activity Stream**
Status: **Completed**<br>
Key Achievements:
- Integration of a fully functional Activity Stream feature in both web and mobile apps.
- Initiation of a Recommendation Engine to provide personalized content suggestions.
- Enhancement of mobile app functionalities to cover a wide range of use cases.
- Maintenance of a well-organized, traceable, and structured GitHub repository for efficient project management.

#### Milestone 3: **Recommendation Engine**
Status: **In Progress**<br>
Objective: To develop a robust Recommendation Engine that caters to individual user preferences and enhances the overall user experience on the platform.

## Customer Feedback and Reflections

### Summary of Customer Feedback:
The customer feedback highlighted several key points for improvement and consideration. Firstly, they appreciated the superior user interface of the mobile app. However, it was made clear that our web app's UI needs to be on par with its mobile counterpart. Customer stated that a consistent quality across platforms is important. Our customer emphasized the need of obtaining consent before demonstrating progress on a local machine. Additionally, the customer advised that even in demos on local machines, the examples used should realistically reflect real-world scenarios. Lastly, they recommended enhancing the timeline feature by replacing the scrolling mechanism with a flipping deck model, for a smoother user experience. Overall, the customer was happy and impressed with the progress so far. Being able to deliver a working recommendation engine was a cherry on top.

### Reflection on Deliverables:
We have notably surpassed expectations. The current version of our mobile app is equipped with all the functionalities present on the web app. Our recommendation engine prototype is working as intended and shown earlier. Minor issues with UI/UX of web app are noted and will be addressed. Newly added Activity Stream and Timeline features were well received. 

## Deliverables

**List and status of deliverables:**

| #   | Deliverable                                                     | Status     |
|-----|-----------------------------------------------------------------|------------|
| 1   | Functional mobile app with camera utilization and location tagging capabilities. | Completed |
| 2   | Implementation of all web app features in the mobile app.       | Completed |
| 3   | Development of an Activity Stream for both web and mobile apps. | Completed |
| 4   | Creation of a Timeline feature for the web app.                 | Completed |
| 5   | Alpha version release of the Recommendation Engine.             | Completed |

### Additional Notes on the Recommendation Engine:
The Recommendation Engine employs a hybrid approach, combining label match, followed user story likes, and proximity of the user's stories. A clustering technique using TF-IDF vectorization of the 'rich_text' field identifies groups of similar stories. It returns cluster labels for each story, providing personalized content recommendations. The engine intelligently handles insufficient data points and lack of user interactions, ensuring relevant content delivery under various scenarios.

- **Weekly meeting notes:** Regular updates providing insights into the project's advancements, obstacles encountered, and decisions taken. These updates keep all parties involved with the project well-informed and in sync with the current state of the project.<br>
[Meeting Notes](https://github.com/SWE574-G3/Living-Stories-App/wiki/Meeting-Notes)

## Evaluation of Tools and Processes
Variety of tools and methodologies were utilized to promote efficiency, clarity, and teamwork. Below is our assessment of these elements:

- **GitHub:** Our main resource for hosting code, managing versions, and facilitating teamwork. GitHub's milestone functionality allowed us to set distinct goals and schedules for our project. The assignment of issues to team members and the use of specific labels have simplified the organization and prioritization of issues faced. Monitoring our milestones through the completion rate has provided us a transparent view of where our project stands.

- **Docker:** Seemless deployment of our software allowed us to test use case scenarios efficiently. Additionally, 
creating an app network allowed us to better control over the network communication between different containers.

- **Postman:** Postman has been an invaluable tool for us, particularly for testing and managing our APIs. It enabled us to efficiently create and execute API requests, inspect responses, and debug in real-time. Using Postman, we've been able to simulate client-server interactions and validate the functionality of our APIs before deployment.

### Reflection:
Tools and processes used throughout this milestone have been cricual for achieving our goals. GitHub has greatly enhanced our ability to manage the project effectively. It has allowed us to clearly define goals and efficiently handle issues. Postman has played an important role in ensuring the reliability and functionality of our APIs. As we move forward, we remain committed to continually evaluating and updating our tools and methodologies to stay aligned with the dynamic needs of our project.

## Requirements Addressed in This Milestone

| Requirement ID | Description                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------------|
| **1.1.13**     | Users receive story or user recommendations based on their activity and interests.                           |
| **1.1.14 - 1.1.15** | Users can find and view stories based on their current geolocation and within a specific radius.    |
| **1.1.16 - 1.1.17** | Users can create stories using photos from their mobile device and pin a story using mobile device location. |
| **1.1.18**     | Users can view a timeline of stories sorted by story start date, featuring story cards with details.         |
| **1.1.19**     | Users can view actions related to their stories and followers in the "activity stream".                       |
| **1.1.20**     | Users can view stories associated with a specific place, sorted by the start date.                           |
| **1.2.3**      | The app provides search functionality to help users find specific memories.                                  |
| **1.2.5**      | The app supports other file formats for shared memories, such as photos and text.                            |
| **1.2.21**     | The activity stream page displays actions of the users followed and related to the user's own stories and profile. |

### Testing

#### General Test Plan for the Project
Our project's testing strategy is designed to ensure robustness and reliability across all aspects of the product. This encompasses a comprehensive approach, integrating various types of testing methodologies:

1. **Unit Testing:** We focus on testing individual components or modules of our application in isolation to confirm that each part functions correctly. This is crucial for both the backend and frontend, including the mobile application, where each function and component is tested for expected behavior.

2. **Integration Testing:** After unit testing, we perform integration testing to ensure that different modules or services used by the application interact with each other seamlessly. This step is vital in verifying the overall system functionality and data flow between modules.

3. **Mock Data Usage:** In scenarios where real data isn't available or is impractical to use, we employ mock data to simulate various data scenarios. This allows us to test how our application behaves under different data conditions and helps in evaluating the handling of edge cases and exceptions.

4. **User Acceptance Testing (UAT):** Close to the completion of our testing phase, selected end-users test the application in an environment that simulates real-world usage. Their feedback is crucial in identifying any unexpected issues or improvements needed before the final deployment.

## Individual Contributions

### Member: Cansel
#### Responsibilities:  
- Creating a brand new recommendation engine upon discussing options and what we would like to achieve with other group members
- Software documentation (report, meeting notes, customer presentation), GitHub (milestones, wiki) and management related responsibilities.
#### Main Contributions:  
- Create an API end point for the recommendation engine 
- Add semantic analysis method to recommendation engine 
- Test the recommendation engine with real data 
- Software documentation, GitHub and management related responsibilities.
##### Code Related Significant Issues:
- Integration Testing for Python Recommendation Engine and Java/Spring Backend API [#87](https://github.com/SWE574-G3/Living-Stories-App/issues/87)
- Update Backend Service for Correct Flask App URL in Docker Environment [#90](https://github.com/SWE574-G3/Living-Stories-App/issues/90)
- Unable to Fetch User Story Likes [#99](https://github.com/SWE574-G3/Living-Stories-App/issues/99)
- Name Similarities of Stored Data for Different Models in Database [#104](https://github.com/SWE574-G3/Living-Stories-App/issues/104)
- TypeError on DataFrame Concatenation Due to Type 'List' [#108](https://github.com/SWE574-G3/Living-Stories-App/issues/108)
- Duplicate Story Recommendations [#110](https://github.com/SWE574-G3/Living-Stories-App/issues/110)
##### Management Related Issues:  
- Milestone 2 Review Report [#132](https://github.com/SWE574-G3/Living-Stories-App/issues/132)
- Review and Provide Feedback on Alternative Recommendation Engine [#93](https://github.com/SWE574-G3/Living-Stories-App/issues/93)
- Determine Database Choice Based on Recommendation Engine Logic [#91](https://github.com/SWE574-G3/Living-Stories-App/issues/91)

Mostly created or resolved by me. Some of them required group effort but tracked by me.
##### Pull Requests:  
- Reviewed and approved Pull Request [120#](https://github.com/SWE574-G3/Living-Stories-App/pull/120) that was opened by Ali Hakan. I went over his 6 commits for front end that mainly involved improvements on Web App's UI for Activity Stream and Recommendation Engine.
#### Additional Information:  
Had meetings with front end, mobile and back end teams to go over data storing naming conventions, API Endpoints and real time testing with dummy data.

---

### Member: Omar 
#### Responsibilities:
- Get the mobile app fully functioning and add all pages with Sanan in React Native with a focus on the design. 
#### Main Contributions:
- Created the Edit Story and Post Story Pages. [#78](https://github.com/SWE574-G3/Living-Stories-App/issues/78), [#89](https://github.com/SWE574-G3/Living-Stories-App/issues/89)
- Developed the Edit Profile Page [#88](https://github.com/SWE574-G3/Living-Stories-App/issues/88)
- Implemented Date and Time settings for Search Page [#96](https://github.com/SWE574-G3/Living-Stories-App/issues/96)
- Built the User Search feature [#107](https://github.com/SWE574-G3/Living-Stories-App/issues/107)
- Designed the General Layout for the Search page and others
##### Code Related Significant Issues:
- Resolved Issues #78, #88, #89, #96, #107
##### Management Related Issues:
- Initiated and Resolved Issues #88, #89, #107
##### Pull Requests:
- Authored and submitted Pull Request #78, reviewed and merged by Sanan
#### Additional Information:
- Collaborated with Senan to achieve a fully functioning state for the mobile app

---

### Member: Ali Hakan
#### Responsibilities: 
  - Enhancing the web application by optimizing the recommendation tab
  - Refining the activity feed
  - Improving the design and functionality of the timeline page
#### Main Contributions: 
  - Implemented Activity Stream Feature in Navigation Bar [#119](https://github.com/SWE574-G3/Living-Stories-App/issues/119)
  - Enhancements and Fixes Implemented for Advanced Timeline Search Functionality [#114](https://github.com/SWE574-G3/Living-Stories-App/issues/114)
  - Revamp TimelinePage UI for Enhanced User Interface [#112](https://github.com/SWE574-G3/Living-Stories-App/issues/112)
  - Enhance User Experience by Developing a Recommendation Data Service and Controller [#101](https://github.com/SWE574-G3/Living-Stories-App/issues/101)
  - Develop a Personalized Recommendation Tab for the Home Screen [#113](https://github.com/SWE574-G3/Living-Stories-App/issues/113)
##### Pull Requests: 
  - Comprehensive Evaluation of Project Progress: Milestone 2 [#120](https://github.com/SWE574-G3/Living-Stories-App/pull/120)

---

### Member: Burak
#### Responsibilities: 
  - Back end management
  - Development of all back end features
  - Communication architecture with Recommendation engine
  - Helping in the development of the recommendation engine
#### Main Contributions: 
  - Responsible for managing/developing all back-end features and assisting with the recommendation engine
  - In charge of decisions related to back end
  - GitHub issue management
  - Preparation and presentation of Milestone 2
##### Code Related Significant Issues:
- [Fix newflag bug #128](https://github.com/link-to-issue-128)
- [Add new flag for activities #127](https://github.com/link-to-issue-127)
- [Unable to Fetch User Story Likes #99](https://github.com/link-to-issue-99)
- [Finalize activity endpoint and provide example request and response. #84](https://github.com/link-to-issue-84)
- [Record Follow Activity to the Activity table. #71](https://github.com/link-to-issue-71)
- [Record Comment Activity to the Activity table. #70](https://github.com/link-to-issue-70)
- [Record Post Activity to the Activity table. #69](https://github.com/link-to-issue-69)
- [Record Like activity to the Activity table. #68](https://github.com/link-to-issue-68)
- [Record activities to the Activity table. #66](https://github.com/link-to-issue-66)
- [Identify places in code where actions we count as "Activity" is performed. #65](https://github.com/link-to-issue-65)
##### Management Related Issues:
- [Review and Provide Feedback on Alternative Recommendation Engine #93](https://github.com/link-to-issue-93)
- [Determine Database Choice Based on Recommendation Engine Logic #91](https://github.com/link-to-issue-91)
- [Integration Testing for Python Recommendation Engine and Java/Spring Backend API #87](https://github.com/link-to-issue-87)
- [Decide on how to handle activity steam. #18](https://github.com/link-to-issue-18)
##### Pull Requests: 
  - Commit contributions to feature branch; pull requests made by Yavuz Salih (back end developer)
#### Additional Information:
  - One of the presenters for Milestone 2

---

### Member: Sanan
#### Responsibilities: Mobile
#### Main Contributions: 
- Expanded the capabilities of the mobile app between milestone one and two
- Created 'Follow User,' 'Like Story,' and 'Comment' buttons
- Added commenting functionality to stories
- Designed a map location selection screen for search and other functions
- Developed the activity stream screen and a dynamic notification button
- Worked on bug fixing and actively supported other teams
- Assisted back end team in writing model, repository, and controller for retrieving user's read and liked stories
##### Code Related Significant Issues:
- [Added location selection with tapping on the screen and searching for location in issue #95](https://github.com/link-to-issue-95)
- [Functionality for users to interact with story and other users in issues #82, #80, #81](https://github.com/link-to-issues-82-80-81)
- [Creating search page and input field](https://github.com/link-to-search-page-issue)
##### Management Related Significant Issues:
- [Created issue #96 for timepicker for search to ensure the use of a reliable library](https://github.com/link-to-issue-96)
- [Developed a model for a table in issue #101 to store which stories a user reads and likes, aiding the recommendation engine](https://github.com/link-to-issue-101)
##### Pull Requests: 
  - Reviewed and merged mobile to the main branch in pull requests [#116](https://github.com/link-to-pull-request-116), [#78](https://github.com/link-to-pull-request-78)
  - Ensured no conflicts during merges
#### Additional Information: 
  - Provided architectural suggestions for the recommendation engine, including the incorporation of NLP clustering for all stories based on content

---

### Member: Erhan
#### Responsibilities: 
  - Creating meeting drafts/notes
  - Creating mockup users and stories and adding data to the main application to test the recommendation engine
#### Main Contributions: 
  - Generated synthetic data to test the performance of the recommendation engine
  - Created a set of 10 users and 20 stories on the web app prototype
  - Interacted with other users’ stories to test the alpha version of the recommendation engine
##### Code-Related Significant Issues:
- [Create Data for Testing Recommendation Engine Performance (#92)](https://github.com/link-to-issue-92)
##### Management-Related Significant Issues: N/A
##### Pull Requests: N/A
#### Additional Information: 
  - Plans to enhance the quality of stories entered based on feedback from the professor
  - Aims to modify the web UI to align more closely with the mobile application's appearance

---

### Member: Salih
#### Responsibilities: 
  - Backend Java Developer and Architect
  - Support for Recommendation Engine Development, and Integration
  - Git management

#### Main Contributions: 
  - In milestone 2, responsible for developing backend logic and tables for activity stream feature
  - Improved existing features of the app by adding new fields to tables and new logic to backend flow
  - Fixed several bugs affecting user experience
  - Contributed to architectural decisions for recommendation engine and helped integrate it with the app

##### Code Related Significant Issues:
- [Finalize activity endpoint and provide example request and response. #84](https://github.com/link-to-issue-84)
- [Modify "/activity" endpoint to read from Activity table. #67](https://github.com/link-to-issue-67)
- [Add Story Post Timestamp. #74](https://github.com/link-to-issue-74)
- [ActivityService should have individual methods for each type of activity. #75](https://github.com/link-to-issue-75)
- [Add activity count endpoint on back-end. #126](https://github.com/link-to-issue-126)
- [Add new flag for activities. #127](https://github.com/link-to-issue-127)
- [Fix newflag bug. #128](https://github.com/link-to-issue-128)
- [Commits that are not present in "test" branch's history should not be able to merge into "main". #56](https://github.com/link-to-issue-56)
- [Record Follow Activity to the Activity table. #71](https://github.com/link-to-issue-71)
- [Record Comment Activity to the Activity table. #70](https://github.com/link-to-issue-70)
- [Record Post Activity to the Activity table. #69](https://github.com/link-to-issue-69)
- [Record Like activity to the Activity table. #68](https://github.com/link-to-issue-68)
- [Identify places in code where actions we count as "Activity" is performed. #65](https://github.com/link-to-issue-65)

##### Management Related Issues:
- [Review and Provide Feedback on Alternative Recommendation Engine #93](https://github.com/link-to-issue-93)
- [Determine Database Choice Based on Recommendation Engine Logic #91](https://github.com/link-to-issue-91)
- [Integration Testing for Python Recommendation Engine and Java/Spring Backend API #87](https://github.com/link-to-issue-87)

#### Pull Requests: 
  - [Merge Mobile to main. #116](https://github.com/link-to-issue-116)
  - [Merge feature/activity-stream branch to main. #85](https://github.com/link-to-issue-85)

