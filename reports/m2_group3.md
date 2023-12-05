
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

---

### Member: Cansel
**Responsibilities:**  
Create an API end point for the recommendation engine <br>
Add semantic analysis method to recommendation engine <br>
Test the recommendation engine with real data <br>
Software documentation, GitHub and management related responsibilities.

**Main Contributions:**  
I have created a brand new recommendation engine upon discussing options and what we would like to achieve with other group members.

- **Code Related Significant Issues:**  


- **Management Related Issues:**  


Mostly created or resolved by me. Some of them required group effort but tracked by me.

**Pull Requests:**  
- Reviewed and approved Pull Request [120#](https://github.com/SWE574-G3/Living-Stories-App/pull/120) that was opened by Ali Hakan. I went over his 6 commits for front end that mainly involved improvements on Web App's UI for Activity Stream and Recommendation Engine.

**Additional Information:**  
Had meetings with front end, mobile and back end teams to go over data storing naming conventions, API Endpoints and real time testing with dummy data.

---
