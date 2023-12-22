# SWE 574 MILESTONE 1 REPORT

## Project Status
A summary of the project status and any changes that are planned for moving forward.

### Overview:
"Living Stories" is a platform tailored for those who cherish memories. Initially starting as a web app designed to aid users in sharing and discovering memories with friends and family, it has now evolved to adapt to modern needs. With functionalities supporting text, photos, and file uploads, users can effortlessly navigate through the platform, making use of features like search, like, follow, geo-location, and commenting.

Taking user convenience to the next level, we've extended "Living Stories" to the mobile realm. Designed for on-the-move sharing and discovery, this version is now available on both iOS and Android platforms. Built robustly with React Native, users can now experience seamless memory-sharing anytime, anywhere.

### Recent Release Description:
**Living Stories - Milestone 1 Release**:<br>
We're excited to announce the fruitful completion of Milestone 1!
- **Dockerization**: By dockerizing the app, we've laid the foundation for scalability and simplified deployment.
- **Device Expansion**: Transitioning from a web-centric approach, we've now brought "Living Stories" right into the pockets of our users. Our mobile app, compatible with both iOS and Android, showcases the finesse of React Native.
  - Mobile App Highlights:
    - Login
    - Register
    - Profile
    - Story Details
    - Home Feed


### Future Prospects:
As we move through our project life cycle, the development team is enthusiastic to roll out a plethora of features, including:
- A state-of-the-art Recommendation Engine
- Functionalities allowing users to directly utilize their mobile device's camera for capturing and uploading photos
- An integrated system to tag locations through mobile device location services
- A meticulously crafted Timeline 
- An interactive Activity Stream

### Milestone Updates:

#### Milestone 1: **Mobile App**
Status: **Completed**<br>
Key Achievements:
- Successful transformation of the platform into a dockerized, cloud-hosted app with mobile support.
- Ensured a systematically organized GitHub repository and structured project management.

#### Milestone 2: **Activity Stream**
Status: **In Progress**<br>
Objective:
- To integrate a fully functional Activity Stream feature, aiming to elevate the mobile application's user experience.

#### Milestone 3: **Recommendation Engine**
Status: **Upcoming**<br>
Objective:
- To implement a fully-functional Recommendation Engine to cater to diverse user requirements. 
- Enhancements to the mobile application with diverse use cases.
- Maintaining an organized, traceable, and well-structured GitHub repository is also a prime focus.

## Customer Feedback and Reflections

### Summary of Customer Feedback:
- **Use Case Diagram:** The recommendation is to omit the backend component since the diagram already addresses it.
- **Duration Time:** It has been noted to specify the duration time.<br>
Example: A time span from 2001-2010 translates to a 9-year duration.
- **Feature Presentation:** For enhanced clarity and actionable feedback, it's suggested to showcase the added mobile app features before the second milestone.
- **Mobile App Direction & Interface:** We received commendation for the direction our mobile app has taken. The customer specifically praised the intuitive and user-friendly interface, appreciating the thought and effort invested in crafting the mobile experience.

### Reflection on Deliverables:
Going forward, our project plan will prioritize showcasing features earlier in the timeline, enabling us to iterate effectively based on feedback. This approach will undoubtedly refine our deliverables and align more closely with stakeholder expectations.

The performance of the mobile team has been outstanding. We've successfully brought the vision of the mobile app to life, and as of this milestone, it's fully operational. We've achieved the majority of our targets for both the mobile and web interfaces. Given that the foundational mobile features are in place, our attention will naturally shift to milestones 2 and 3. 

In terms of backend development, we've thoroughly scrutinized core functionalities, implemented necessary refinements, and laid out a blueprint for future development. From a managerial standpoint, our team's adherence to transparency and effective communication has been noteworthy. Our consistent weekly meetings were marked by full participation and mutual collaboration.

However, while our accomplishments are admirable, we've identified areas that necessitate further improvement. We recognize the pressing need to bolster the interfacing between various components - be it web/mobile to backend or the recommendation system to backend. Additionally, our roadmap for future development should prioritize simplicity and directness to facilitate seamless progression.


## Deliverables
**List and status of deliverables:**

- **Software Requirements Specification:** A comprehensive document that captures all the requirements of the software project. It serves as a foundation for all subsequent project activities.<br>
[Requirements](https://github.com/SWE574-G3/Living-Stories-App/wiki/Requirements)

- **Software Design Documents:** These documents outline the architecture and design decisions made for the software project. They provide a blueprint for developers to follow during implementation.

- **Scenarios and Mockups:** Visual and written representations that showcase the expected behavior and appearance of the application. They are pivotal in giving stakeholders an early view of the end product.<br>
[Scenarios and Mockups](https://github.com/SWE574-G3/Living-Stories-App/wiki/Scenarios-and-Mock%E2%80%90Ups)

- **Project Plan, Communication Plan, Responsibility Assignment Matrix:** 
  - **Project Plan:** We utilize the GitHub milestone feature for our project planning. Issues are systematically assigned to group members, appropriately labeled, and linked to the relevant milestone. Our progress is tracked through the completion percentage of each milestone and the number of open issues.<br>
[Milestones](https://github.com/SWE574-G3/Living-Stories-App/milestones)
  - **Communication Plan:** Guidelines and strategies on how project members will communicate throughout the project's duration.<br>
[Communication Plan](https://github.com/SWE574-G3/Living-Stories-App/wiki/Communication-Plan)
  - **Responsibility Assignment Matrix (RAM):** A table that aligns tasks with team members, ensuring that every activity has a designated responsible individual.<br>
[RAM](https://github.com/SWE574-G3/Living-Stories-App/wiki/Responsibility-Assignment-Matrix-(RAM))

- **Weekly reports and any additional meeting notes:** Periodic updates that capture the progress, challenges, and decisions made during the project. They ensure stakeholders are informed and aligned on the project's status.<br>
[Meeting Notes](https://github.com/SWE574-G3/Living-Stories-App/wiki/Meeting-Notes)

## Evaluation of Tools and Processes

Throughout the development and management of our project, we have leveraged a variety of tools and processes to ensure efficiency, transparency, and collaboration. Here's our evaluation:

- **GitHub:** One of our primary tools for code hosting, version control, and collaboration. By utilizing GitHub's milestone features, we've been able to define clear objectives and timelines for our project. The ability to assign issues to group members and label them appropriately has streamlined task management and prioritization. Tracking milestone progress through completion percentage and open issues has provided us with a clear vision of our project's status at any given moment.

- **Docker:** By dockerizing our application, we have ensured scalability and easy deployment, thus enhancing the delivery speed and flexibility of our software.

- **React Native:** This framework was chosen for mobile application development due to its cross-platform capabilities. With React Native, we've been able to seamlessly roll out our app on both iOS and Android platforms, ensuring a wider audience reach and consistent user experience across devices.

- **REST API:** Our decision to interface the mobile app with the "Living History WebApp" through a REST API has enabled seamless data exchange and ensured that both our web and mobile platforms offer users the same core features and benefits.

### Reflection:
Evaluating our tools and processes, we believe our choices have played a pivotal role in the current success of our project. GitHub's features have significantly improved our project management capabilities. Tools like Docker and React Native have streamlined our development and deployment processes. We're continually assessing our toolset and processes to ensure they align with our evolving project needs and stakeholder expectations.


## Requirements Addressed in This Milestone

| Requirement ID | Description                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------------|
| **Mobile App** |                                                                                                              |
| 1.2.18         | The mobile app is designed to interface seamlessly with the "Living History WebApp" utilizing a REST API.    |
| 1.2.19         | Ensuring broad accessibility, the app is made available across both Android and iOS mobile platforms.        |
| **Web App**    |                                                                                                              |
| 1.1.15         | Users have the capability to search and discover stories within a specific geographical radius.               |
| 1.1.16         | Leveraging geo-location services, users can instantly view stories proximate to their current location.      |
| 1.1.22         | Offering a structured view, users can explore stories associated with a specific place, sorted by the start date. |



## Individual Contributions

### Member: Burak
**Responsibilities:**  
Back-End Mainly Activity Stream and support on Recommendation Engine

**Main Contributions:**  
- **Code Related significant issues:**  
  - Initialize "like" endpoint for activity stream [#20](https://github.com/SWE574-G3/Living-Stories-App/issues/20)
  - Add a basic endpoint for getting activity stream based on actions of followed users [#19](https://github.com/SWE574-G3/Living-Stories-App/issues/19)
  - Create an Activity entity that stores activities of users [#64](https://github.com/SWE574-G3/Living-Stories-App/issues/64)
  
- **Management-related significant issues:**  
  - Align with group members on backend and database technologies to be used for the project [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)
  - Align with group members on Integration Method for Recommendation Engine [#6](https://github.com/SWE574-G3/Living-Stories-App/issues/6)
  - Getting familiar with the base project [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)
  - Software Design Documents UML [#39](https://github.com/SWE574-G3/Living-Stories-App/issues/39)
  - Create custom issue labels [#2](https://github.com/SWE574-G3/Living-Stories-App/issues/2)

**Pull requests:**  
Reviewed Adding reports folder and apk location [#63](https://github.com/SWE574-G3/Living-Stories-App/pull/63). The conflict was on test/main branch as there are bunch of subbranches for activities which were pushed into the test branch and after that when we tried to merge that into main we had an error regarding “unsigned commits” which was because of the way we committed into GitHub. Yavus Salih, did Merge and Squash for this to work.

**Additional Information:**  
Participated in the overall design ideas, partially presented the first milestone. Created a milestone for Activity Stream feature. Created stories for the Milestone 1 demo.

---

### Member: Omar
**Responsibilities:**  
Create a mobile app with Sanan in React Native and Improve the Web App, with focus on the design.

**Main Contributions:**  
Up until Milestone 1, I’ve worked with Sanan on the mobile app, and creating the updated mockups. I’ve Created the Card component design for stories and designed the Feed, Profile,(Based on mockups) Login and Register pages and Improved the Story page Design (Issues [#35](https://github.com/SWE574-G3/Living-Stories-App/issues/35) [#36](https://github.com/SWE574-G3/Living-Stories-App/issues/36) [#37](https://github.com/SWE574-G3/Living-Stories-App/issues/37) [#49](https://github.com/SWE574-G3/Living-Stories-App/issues/49) [#50](https://github.com/SWE574-G3/Living-Stories-App/issues/50)), After the main functions in each page were implemented by Sanan.

- **Code Related Significant Issues:**  
  Issues [#35](https://github.com/SWE574-G3/Living-Stories-App/issues/35) [#36](https://github.com/SWE574-G3/Living-Stories-App/issues/36) [#37](https://github.com/SWE574-G3/Living-Stories-App/issues/37) [#49](https://github.com/SWE574-G3/Living-Stories-App/issues/49) [#50](https://github.com/SWE574-G3/Living-Stories-App/issues/50) Solved by me, mostly design was implemented.

- **Management Related Issues:**  
  Created Issues [#24](https://github.com/SWE574-G3/Living-Stories-App/issues/24) [#30](https://github.com/SWE574-G3/Living-Stories-App/issues/30) [#31](https://github.com/SWE574-G3/Living-Stories-App/issues/31) [#32](https://github.com/SWE574-G3/Living-Stories-App/issues/32) [#33](https://github.com/SWE574-G3/Living-Stories-App/issues/33) that were Resolved by Sanan.

**Pull Requests:**  
- Created Pull Request [#27](https://github.com/SWE574-G3/Living-Stories-App/pull/27) that was Reviewed and Merged by Sanan.
- Created Pull Request [#28](https://github.com/SWE574-G3/Living-Stories-App/pull/28) that was closed without merging due to changes being covered in a later commit.

**Additional Information:**  
Research and finding solutions for problems faced in the app while learning ReactNative. Contributed in Debugging while creating the APK build for the app.

---

### Member: Sanan
**Responsibilities:**  
Create a mobile app with Omar in React Native. Provide necessary information about the front end and back end to the corresponding teams.

**Main Contributions:**  
My contributions included setting up the React Native project and navigation infrastructure, adding maps to the app, writing API requests, and helping design the Story page, feed, and profile mobile page.

- **Code-related significant issues:**  
  - Creating JWT authentication for the mobile app [#26](https://github.com/SWE574-G3/Living-Stories-App/issues/26)
  - Removing buggy packages from the app [#29](https://github.com/SWE574-G3/Living-Stories-App/issues/29)
  - Creating pages, and improving designs of several pages [#35](https://github.com/SWE574-G3/Living-Stories-App/issues/35) [#36](https://github.com/SWE574-G3/Living-Stories-App/issues/36) [#37](https://github.com/SWE574-G3/Living-Stories-App/issues/37) [#38](https://github.com/SWE574-G3/Living-Stories-App/issues/38)
  - Map view added to necessary pages [#38](https://github.com/SWE574-G3/Living-Stories-App/issues/38)

- **Management-related significant issues:**  
  - I cloned my repo from 573 to our organization's repo [#5](https://github.com/SWE574-G3/Living-Stories-App/issues/5)
  - I created the backbone of the project and its folders in the repo [#21](https://github.com/SWE574-G3/Living-Stories-App/issues/21)
  - Created a separate branch for mobile development [#22](https://github.com/SWE574-G3/Living-Stories-App/issues/22)

**Pull requests:**  
In pull request [#59](https://github.com/SWE574-G3/Living-Stories-App/pull/59), I added the mobile folder to the test branch. After that, in pull request [#63](https://github.com/SWE574-G3/Living-Stories-App/pull/63), I added the report folder and the location of the mobile APK file to the main branch.

**Additional Information:**  
Create a QR code for the presentation, get the Android build of the app, and help the back end and front end teams understand my code.

---

### Member: Cansel
**Responsibilities:**  
Create a recommendation engine in Python.<br>
Software documentation, GitHub and management related responsibilities.

**Main Contributions:**  
I have created and maintained the project Wiki. This includes Responsibility Assignment Matrix, Communication Plan, Meeting Notes, Main Tasks, Requirements and Home Page. I also created milestones, issue labels, milestone 1 review presentation, opened issues and tracked progress to ensure we were on track to meet deadlines.

I also researched the best way to implement Recommendation Engine. I have drafted an overview document about my intended design and committed it under the Recommendation Engine folder of the Recommendation Engine branch I have created. I had multiple meetings with the backend team to discuss the best way to handle the data flow for a smooth operation. A draft code was also committed by me for the model I proposed.

- **Code Related Significant Issues:**  
- Create Branch for Recommendation Engine Development [#47](https://github.com/SWE574-G3/Living-Stories-App/issues/47) 
- Research Optimal Model for Recommendation Engine [#72](https://github.com/SWE574-G3/Living-Stories-App/issues/72)
- Align with group members on Integration Method for Recommendation Engine [#6] (https://github.com/SWE574-G3/Living-Stories-App/issues/6)

- **Management Related Issues:**  
- Share the missing meeting notes and agenda [#16](https://github.com/SWE574-G3/Living-Stories-App/issues/16) 
- Complete the Software Requirements Specification Document [#42](https://github.com/SWE574-G3/Living-Stories-App/issues/42) 
- Create Project Plan, Communication Plan, and Responsibility Assignment Matrix [#43](https://github.com/SWE574-G3/Living-Stories-App/issues/43) 
- Maintain Weekly Reports and Archive Meeting Notes [#44](https://github.com/SWE574-G3/Living-Stories-App/issues/44) 
- Release Pre-release Version of the Software [#46](https://github.com/SWE574-G3/Living-Stories-App/issues/46)

Mostly created or resolved by mostly me. Some of them required group effort but tracked by me.

**Pull Requests:**  
- Created Pull Request [73#](https://github.com/SWE574-G3/Living-Stories-App/pull/73) that was reviewed and merged by Sanan.

**Additional Information:**  
Had meetings with front end, mobile and back end teams to go over requirements.

---

## Member: Ali Hakan

**Responsibilities:**  
Responsibilities include the development and enhancement of web application functionalities, with a focus on both front-end and back-end architecture, as well as the strategic refactoring of code to improve performance and maintainability.

**Main Contributions:**  

**Code Related significant issues:**  
- [Enhance Frontend State Management in React: Refactoring #11](https://github.com/SWE574-G3/Living-Stories-App/issues/11)
- [Solution for Google Maps Radius Trigger Event #61](https://github.com/SWE574-G3/Living-Stories-App/issues/61)
- [Unable to use LIKE operator with TEXT type in JPA Query #57](https://github.com/SWE574-G3/Living-Stories-App/issues/57)
- [Design and Implement a Timeline Page #52](https://github.com/SWE574-G3/Living-Stories-App/issues/52)
- [Image Compression Feature to React-Quill #51](https://github.com/SWE574-G3/Living-Stories-App/issues/51)
- [Integrate All Branches with SonarQube #41](https://github.com/SWE574-G3/Living-Stories-App/issues/41)
- [Implementing a Homepage Navigation Bar #23](https://github.com/SWE574-G3/Living-Stories-App/issues/23)
- [Implement SonarQube Integration for Repository Code Analysis #13](https://github.com/SWE574-G3/Living-Stories-App/issues/13)

**Management-related significant issues:**  
- [Align with group members on backend and database technologies to be used for the project. #3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)
- [Align with group members on how to handle the UI and mobile application aspect. #4](https://github.com/SWE574-G3/Living-Stories-App/issues/4)
- [Prepare Responsibility Assignment Matrix. #7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)

**Pull requests:**  
- [Unable to use LIKE operator... #57 #58](https://github.com/SWE574-G3/Living-Stories-App/pull/58)
- [Bug resolved #62](https://github.com/SWE574-G3/Living-Stories-App/pull/62)
- [SonarQube and Timeline Page #55](https://github.com/SWE574-G3/Living-Stories-App/pull/55)
- [#13 Test regarding SonarQube #14](https://github.com/SWE574-G3/Living-Stories-App/pull/14)
- [Create sonarcloud.yml #12](https://github.com/SWE574-G3/Living-Stories-App/pull/12)

**Additional Information:**  
My primary contributions have been the integration of code analysis tools and the development of a Timeline feature for our web application. Additionally, I have undertaken significant refactoring efforts to enhance the application's performance and scalability. The upcoming introduction of a heat-map feature is in the pipeline, though it has not been formally announced. These enhancements are scheduled to be showcased in the project's second milestone.

---

## Member: Erhan

**Responsibilities:**  
I spent most of my time creating documentation and getting familiar with the code and coding. I am planning to join the front-end development team with Senan, Omar, and Ali Hakan for the second milestone.

**Main Contributions:**  
- Gathered weekly meeting notes and shared on the wiki with Cansel.
- Joined almost every team meeting.
- Created the first mock-ups for the project.
- Wrote the scenario for the updated mock-ups.

**Code Related Significant Issues:**  
- [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)
- [#4](https://github.com/SWE574-G3/Living-Stories-App/issues/4)
- [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)
- [#46](https://github.com/SWE574-G3/Living-Stories-App/issues/46)

**Management Related Issues:**  
- [#7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)
- [#15](https://github.com/SWE574-G3/Living-Stories-App/issues/15)
- [#16](https://github.com/SWE574-G3/Living-Stories-App/issues/16)
- [#40](https://github.com/SWE574-G3/Living-Stories-App/issues/40)
- [#44](https://github.com/SWE574-G3/Living-Stories-App/issues/44)

**Pull Requests:**  
None for the time being.

**Additional Information:**  
I have decided that, in order to avoid burdening the team, I should concentrate on the documentation part of the first milestone, as I don't have the same experience as other team members and have failed SWE 573.

---

### Member: Salih
**Responsibilities:**  
One of Main Code Developers and Architect for New Features on Back-End. Also responsible for maintaining Git branch structure and consulting team members on Git.

**Main Contributions:**  
- **Code Related significant issues:**  
  - Identify places in code where actions we count as "Activity" is performed. [#65](https://github.com/SWE574-G3/Living-Stories-App/issues/65)
  - Create an Activity entity that stores activities of users [#64](https://github.com/SWE574-G3/Living-Stories-App/issues/64)
  - Add a basic endpoint for getting activity stream based on actions of followed users [#19](https://github.com/SWE574-G3/Living-Stories-App/issues/19)
  - Refactor activity stream controller to communicate with a single endpoint. [#54](https://github.com/SWE574-G3/Living-Stories-App/issues/54)   
  - Prepare code standards for Java development. [#10](https://github.com/SWE574-G3/Living-Stories-App/issues/10) 
  - Add unit test for new commment service method [#53](https://github.com/SWE574-G3/Living-Stories-App/issues/53) 

- **Management-related significant issues:**  
  - Decide on how to handle activity steam. [#18](https://github.com/SWE574-G3/Living-Stories-App/issues/18)
  - Align with group members on backend and database technologies to be used for the project [#3](https://github.com/SWE574-G3/Living-Stories-App/issues/3)
  - Align with group members on Integration Method for Recommendation Engine [#6](https://github.com/SWE574-G3/Living-Stories-App/issues/6)
  - Prepare Responsibility Assignment Matrix. (led by Cansel) [#7](https://github.com/SWE574-G3/Living-Stories-App/issues/7)
  - Getting familiar with the base project [#9](https://github.com/SWE574-G3/Living-Stories-App/issues/9)
  - Create custom issue labels [#2](https://github.com/SWE574-G3/Living-Stories-App/issues/2)

**Pull requests:**  
For milestone 1, new features on the backend were not merged into "main" so we, as backend developers, did not have any pull requests to main. Our work is in our own feature branch, which is available at [feature/activity-stream](https://github.com/SWE574-G3/Living-Stories-App/tree/feature/activity-stream).  
I have reviewed and solved the related issues on the pull request to main branch for milestone 1 release available at: [Merge branch "test" into "main"](https://github.com/SWE574-G3/Living-Stories-App/pull/60).  
Also reviewed and merged the PR available at: [58](https://github.com/SWE574-G3/Living-Stories-App/pull/58).

**Additional Information:**  
Communicated closely with front-end and recommendation engine developers to decide on optimal achitecture for integration of new features. Transferred knowledge to the team on how to optimally use Git for our project. 

---
