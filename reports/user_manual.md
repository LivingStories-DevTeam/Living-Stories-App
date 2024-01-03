# User Manual

## Web Application

**Acknowledgement:** The web application is fundamentally structured into pages. Consequently, categorizing the user manual in alignment with these pages offers a consistent and straightforward method for navigation and reference.

### Landing Page

![landing_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/6e739968-be3d-4d64-81e0-f4d46b79caee)

**Description:** The landing page serves as the initial interface encountered by users upon accessing the web application. It is designed to be the first point of interaction, providing a welcoming and intuitive experience. On this page, users are presented with two primary navigation options: signing up for a new account or logging in to an existing account.

#### Sign Up

![sign_up](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/1abd6947-f584-451b-998a-b6d06384c680)

**Description:** The _Sign Up_ feature is accessible via the _Join Us_ button on the landing page. Upon clicking this, users are directed to the sign-up page. Here, they are required to enter their email, create a username, which will be their visible identity within the application, and set a password. For security, the password must be entered twice to confirm accuracy. Completing these steps and clicking the _Register_ button finalizes the sign-up process, requiring no further action. For users who have previously registered, a convenient text link stating _If you have an account, go to the Login!_ is available. This link provides immediate redirection to the login page, streamlining the process for returning users.

#### Login

![login_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/b57b56d0-ef83-4661-aba8-da12c735292c)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/637f4718-b478-4a68-bda8-c4016a07b6c9)

**Description:** Users are required to enter their registered email and password to gain access to the system. For those who are new to the application and haven't registered yet, there is a helpful text link provided: _If you don't have an account, go to the register!_ Clicking on this link directs them to the registration page.

### Home Page

![home_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/87572f82-960b-4865-8d16-c2ca5b4655bb)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/f9cfee83-426f-4d2f-89e1-a76463aaa89a)

**Description:** Upon successful login, users are welcomed to the home page, which prominently displays an array of stories. This page is intuitively organized into three tabs: _All_, _Followings_, and _Recommended_, each presenting stories based on distinct criteria. Additionally, the home page features a navigation bar at the top of the screen. On the left side of this bar, text-based links are available, including the user's profile page, labeled with their username, a search function, and a timeline feature.

On the right side of the navigation bar, users will find a clickable bell icon. This icon activates a drawer that reveals the latest activities and includes a numerical indicator showing the count of unread activities. Following the bell icon, there are text links for creating a new story and logging out.

#### Tab: All

**Description:** The _All_ tab displays every story on the platform, sorted by their creation date, with the newest stories appearing first.

#### Tab: Followings

**Description:** The _Followings_ tab displays stories from users that the logged-in user is following.

#### Tab: Recommended

**Description:** The _Recommended_ tab features stories suggested to the user by the recommendation engine.

#### Card Structure

**Description:** Each card displays the story's title, location, and dates mentioned in the story. It includes tags with green components, and icons for comments and likes, showing their respective counts.

#### Activity 

![activity](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/d6017a65-5776-4daf-9fb0-be42a07e9ce2)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/08772e80-9d08-433a-a373-b25b1812282b)

**Description:** Clicking the bell button opens a drawer on the right side of the screen, listing all activities in descending order by timestamp. Clicking on any activity that references a story redirects the user to that story.

### Profile Page

![profile_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/29824e15-fe53-4879-88da-7da86aa95128)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/1a83af54-9c05-47af-81af-c64e20b10a5f)

**Description:** The profile page allows users to change their avatar and profile description. It displays the number of followers with an icon and a list of who they are, as well as the total number of stories posted by the user. Each story is presented in a card format, which is clickable and leads to the story page. Users can also edit stories they have authored.

### Search Page

![search_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/8877480f-1e8c-4169-ae01-f0d0545f8c2b)
![search_page_2](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/118b5305-4bd4-4380-b1ce-7d6803615a85)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/cde0ae88-bda1-4e53-8a7c-fc85e5cfc98c)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/a676dde8-a0a7-49ae-b423-eb1b2dc752f7)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/fc0ee0e0-82b7-4e9b-966c-66c0a281abcb)

**Description:** The search page offers two main tabs for searching: one for stories and another for users. User searches require only the username. Clicking on any user search result leads to that user's profile. The story search tab allows filtering by title, city, label, author's name, which is username, country, and text, which is story content. There's also a date filter, which can be searched by specific dates, intervals, decades, or seasons. Additionally, users can filter stories by location, selecting a specific area and defining a circular radius to find stories created within that area.

### Timeline Page

![timeline_page](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/bd13538a-068f-4a49-b69d-c9b6b3b7db15)
![timeline_page_2](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/21f0a56d-83d3-44be-841b-f89523ce9e5a)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/96ee0ec1-0ee7-49a0-a67e-cb9b5c9e882f)

**Description:** The Timeline page incorporates similar filters to the Search page, with enhanced date options ,t though excluding season, and a simplified single text component for broader searches. The key difference lies in its presentation of stories. Here, stories are showcased individually, with a focus on pictures and titles. Users can navigate through the stories using a navigator tool, and there is also a play button for automatically progressing through all the stories.

### Story Creation Page

![create_search](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/4d8076c2-e160-4a1b-a4c0-1baa9e39a51b)
![create_search_2](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/0a16a5d7-9ab2-4384-a005-7b771dfec982)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/151c4277-e4df-45b1-96ce-7d8e0be38d1e)

**Description:** The Story Creation page is where users can create their stories. Users need to enter a title and add labels separated by commas. The main content area is a React Quill text editor, allowing for the import of media files like images, GIFs, or videos, along with other features. Date selection is the same as in the story search page. The location selection is unique, offering a drawing tool for users to define polygonal or point-based locations, even multiple ones. Additionally, there is an autocomplete search component for finding locations by typing.

### Story View Page

![story_view](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/b6712e9a-6a8d-4734-b0b1-1f0902aaab07)
![story_view_2](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/50c0d99d-55b6-49ca-8593-fd919c209409)
![image](https://github.com/SWE574-G3/Living-Stories-App/assets/110849135/df08f301-6de7-4836-924b-529c4d955020)

**Description:** The Story View page is accessible from the activity, home page, profile page, or timeline page by clicking on the story cards. On this page, users can see the title, tags, content, locations mentioned, and the date and season of the story, if provided. Editing is available only if the viewer is the author of the story. Additionally, users can like the story, write comments, and view comments made by others.

