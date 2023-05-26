## 1. SmashBruh Movie Renting Website - Documentation

### 1.1. Team member

| Full Name            | Student Id | Tasks                                                                                                                                                                                                |     |
| -------------------- | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Nguyễn Ngọc Vĩnh     |   18691    | Movie and TV Shows details, trailers, and recommendations backend API; Movie Search and Filtering API; UI/UX of Homepage and MoviePage; Markdown and Swagger Documentation, Analytics and Reporting. |     |
| Hà Quách Phú Thành   |   18840    | Moderate and in charge of frontend and backend; Manage members work and meetings; configure CI/CD, pipeline and Docker development;                                                                  |
| Thái Quang Nam       |   18770    | Design UI for Navbar, HomePage, FeatureMoviePage, TVShowsPage, MyListPage, SearchPage; Markdown Documentation, Reporting                                                                             |
| Phạm Hoàng Việt      |   18334    | Design MoviePages and ShowPages ; Markdown Documentation, Reporting User Interface                                                                                                                   |
| Nguyễn Xuân Khang    |   18973    | Set up Frontend and Backend ProfilePage; Markdown Documentation                                                                                                                                      |
| Nguyễn Khắc Hoàng    |   18230    | Overall UI, ProfilePage, Login/RegisterPage, AccountPage; Markdown Documentation, Reporting                                                                                                          |
| Lê Duy               |   17434    | Set up Email Verification, Security; Markdown Documentation; Reporting                                                                                                                               |
| Trần Ngọc Duy Chương |   17197    | Backend for OAuth2, Authentication; Markdown Documentation; Reporting                                                                                                                                |

### 1.2. About our project

Introducing our advanced movie rental application, providing an exceptional cinematic experience. With a user-friendly interface, diverse movie collection, and personalized rental queues, our app offers navigation and immersive film exploration. Discover captivating narratives, acclaimed works, and a wide range of genres on your screen.

With our media rental web application, you can now keep track of rented movies and TV show, as well as keeping track of your favourites and rate them accordingly, provided to you with one of the largest movie database - The Movie Database (TMDB) - a free and open movie database for developers, which also acts as our main API for working with movies/shows.

### 1.3. Table of content

- [1. SmashBruh Movie Renting Website - Documentation](#1-smashbruh-movie-renting-website---documentation)
  - [1.1. Team member](#11-team-member)
  - [1.2. About our project](#12-about-our-project)
  - [1.3. Table of content](#13-table-of-content)
- [2. Introduction](#2-introduction)
  - [2.1. Project Overview](#21-project-overview)
  - [2.2. Objective](#22-objective)
- [3. System Analysis](#3-system-analysis)
  - [3.1. Business Requirements](#31-business-requirements)
  - [3.2. User Requirements](#32-user-requirements)
  - [3.3. Functional Requirements](#33-functional-requirements)
  - [3.4. Non-Functional Requirements](#34-non-functional-requirements)
- [4. System Design](#4-system-design)
  - [4.1. System Diagrams](#41-system-diagrams)
  - [4.2. System Architecture](#42-system-architecture)
    - [4.2.1. MVC Models for Web Development](#421-mvc-models-for-web-development)
  - [4.3. Components Design](#43-components-design)
    - [4.3.1. Users Interface:](#431-users-interface)
    - [4.3.2. Authentication Interface:](#432-authentication-interface)
  - [4.4. Structure and Relationships](#44-structure-and-relationships)
  - [4.5. Data Model](#45-data-model)
  - [4.6. GUI](#46-gui)
  - [4.7. Functionality Design](#47-functionality-design)
- [5. Implementation](#5-implementation)
  - [5.1. File Structure](#51-file-structure)
  - [5.2. Development Environment and Technology Stack](#52-development-environment-and-technology-stack)
  - [5.3. CI/CD Testing, Docker and Deployment](#53-cicd-testing-docker-and-deployment)
  - [5.5. API Utilization](#55-api-utilization)
    - [5.5.1. Movies](#551-movies)
    - [5.5.2. TV Shows](#552-tv-shows)
    - [5.5.3. Discovery](#553-discovery)
- [6. User Guide](#6-user-guide)
  - [6.1. Getting Started](#61-getting-started)
- [7. Conclusion](#7-conclusion)
  - [7.1. Summary of Project](#71-summary-of-project)
  - [7.2. Future Work](#72-future-work)
  - [7.3. References](#73-references)

## 2. Introduction

### 2.1. Project Overview

SmashBruh is an movie rental web application that aims to simplify the way people discover and rent movies. Our project aims to provide options for users to view the information related to movies and shows. They also have the choice to choose which movies or shows to rent and have their rented information saved for later use. The web app also allows users to perform actions such as liking and rating, which can be viewed, easily accessed and managed.

### 2.2. Objective

- Extensive Movie Library: Curate a diverse collection of films across genres, eras, and cultures to cater to the varied preferences of our users. From classic masterpieces to the latest releases, ensure a wide range of options that cover different cinematic experiences.

- User-Friendly Interface: Develop an intuitive and easy-to-navigate website interface that allows users to explore and discover movies. Implement robust search functionality, filters, and sorting options to facilitate effortless movie browsing.

- Detailed Movie Information: Provide comprehensive and accurate movie information to assist users in making informed decisions. Include detailed descriptions, plot summaries, cast and crew details, user ratings, and reviews to give users valuable insights into each film.

- Personalized Recommendations: Implement a sophisticated recommendation system that analyzes user preferences on the movies and shows currently accessed. Generate personalized movie suggestions that align with users' tastes, helping them discover new films and broaden their cinematic horizons.

- Easy Rental Process: Streamline the movie rental process to make it convenient and hassle-free for users. Implement a straightforward rental system where users can choose their desired movies, rental duration, and complete secure online payments.

## 3. System Analysis

### 3.1. Business Requirements

The business requirements of SmashBruh are as follows:

- Broad Selection of Content: Users expect a wide variety of movies and TV shows across different genres, including popular releases, classics, and niche titles. They want access to a diverse library that caters to their individual preferences and interests.
- User Account Management: SmashBruh requires a user account management system to allow users to create profiles, save preferences, manage their watch lists, and track their searching history. This feature provides a personalized experience and enables users to easily access and organize their preferred content.
- Cross-Platform Accessibility: SmashBruh should be accessible across different devices and platforms, including web browsers, mobile devices, and smart TVs. This ensures that users can enjoy their favorite content conveniently, regardless of the device they are using.
- Analytics and Reporting: The platform requires robust analytics and reporting capabilities to track user behavior, content popularity, and performance metrics. These insights help in making data-driven decisions, improving the user experience, and optimizing the content library.

By fulfilling these business requirements, SmashBruh can create a user-friendly interface, up-to-date information and a stable searching and recommendation system inside the rental movie system to maintain the flow of the website.

### 3.2. User Requirements

The user requirements of SmashBruh are as follows:

- First Time User Experience: SmashBruh provides visitors latest movie that the system have to offer and other information of available movies and shows at the giving moment so that the system keeps up with user's interest.
- Efficient Search and Filtering: Users require an efficient search functionality that allows them to search for specific titles, genres, actors, directors, or keywords. They also expect advanced filtering options to refine their search results based on criteria such as release year, ratings, and language.
- Movie Information Based Recommendations: Users appreciate personalized recommendations based on their current accessed movies and shows. It could be based on names, genres, cast.
- Ratings: Users value the ability to read and contribute to ratings. They want a platform that encourages user feedback, enabling them to make informed decisions and engage in discussions with other movie enthusiasts.
- Flexible Rental Options: Users prefer flexible rental options, including various pricing plans with understandable cost to spend. They want the freedom to choose the rental plan that suits their preferences and viewing habits.
- Cross-Platform Compatibility: Users want the flexibility to access SmashBruh on multiple devices, including web browsers, smartphones, tablets, and smart TVs. They expect a seamless experience that allows them to pick up where they left off across different devices.
- Simple Payment Processing: Users don't have to worry about payment system because we uses simple calculation (addtion, subtraction, multiplication and division) based on what users have chosen to be their pricing plan mentioned in the previous part.

By addressing these user requirements, SmashBruh can provide a user-centric experience that meets the expectations of movie enthusiasts, offering them a vast selection of content, seamless navigation and personalized recommendations.

### 3.3. Functional Requirements

The functional requirements of SmashBruh are as follows:

- User Registration and Account Management:
  - Users should be able to create an account and provide necessary information.
  - Users should be able to log in securely and manage their account settings.
- Content Catalog and Search:
  - The platform should maintain a comprehensive catalog of movies and TV shows.
  - Users should be able to search for content by title.
  - Advanced filtering options should be available to refine search results.
- Movie and TV Show Details:
  - Users should be able to view detailed information about each movie or TV show, including synopsis, cast, director, ratings, and reviews.
  - The platform should display relevant recommendations and similar content.
- Rental Options:
  - Users should be able to select rental pricing plans.
  - The platform should provide pricing details, rental durations, and availability information.
- Payment Processing:
  - The platform should securely process payments using simple calculations.
  - Users should receive a decreasing amount of money in their net balance
- My list and Favourites:
  - Users should be able to create and manage a watch list of movies and TV shows.
  - The platform should provide personalized recommendations based on user preferences and ratings.
- Ratings:
  - Users should be able to rate stars score for movies and TV shows.
  - The platform should display average ratings and aggregate reviews for each title.
- Analytics and Reporting:
  - The platform should collect and analyze data to generate insights on user behavior, content popularity, and platform performance.

### 3.4. Non-Functional Requirements

The non-functional requirements of SmashBruh are as follows:

- Performance:
  - The platform should have fast loading times and responsive navigation to provide a seamless user experience.
- Scalability and Availability:
  - The platform should be designed to handle a growing user base and increasing traffic without compromising performance.
  - It should be scalable to accommodate a large number of concurrent users and a growing content library.
  - The platform should have a high level of availability, minimizing downtime and ensuring users can access the service whenever they need it.
  - Measures such as redundancy, load balancing, and backup systems should be in place to maintain availability.
- Security:
  - The platform should implement robust security measures to protect users' personal information, payment details, and viewing history.
  - Secure encryption protocols should be used to ensure the confidentiality and integrity of data.
- Compatibility:
  - The platform should be compatible with various operating systems, web browsers, and devices to accommodate a wide range of user preferences.
  - It should adapt to different screen sizes and resolutions, providing a consistent and optimized experience across devices.
- Usability:
  - The platform should have a user-friendly and intuitive interface, making it easy for users to navigate, search for content, and manage their account.
  - Clear and concise instructions and tooltips should be provided to guide users through different features and functionalities.
- Data Privacy:
  - The platform should comply with data protection regulations and ensure the privacy of user data.
  - Clear privacy policies and consent mechanisms should be in place, informing users about data collection, storage, and usage practices.
- Performance Monitoring and Optimization:
  - The platform should have monitoring mechanisms in place to track performance metrics, identify bottlenecks, and optimize system performance.
  - Regular performance testing and optimization should be conducted to ensure optimal user experience.
- Cross-Platform Accessibility:
  - The platform should be accessible across devices and platforms, including web browsers, mobile devices, and smart TVs.

## 4. System Design

### 4.1. System Diagrams

Use Cases

User Use Case Diagrams
<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;" 
      src="UseCases/User/UserUseCaseDiagrams.png" alt="User Use Case" width="700">

Sequence

- Admin Sequence
  <img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;" 
      src="Sequence/AdminSequenceDiagrams.png" alt="AdminSequenceDiagrams" width="700">

- User Sequence
  <img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;" 
      src="Sequence/UserSequenceDiagrams.png" alt="UserSequenceDiagrams" width="700">

Database
<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;" 
      src="DatabaseDiagram.png" alt="Database" width="700">

### 4.2. System Architecture

#### 4.2.1. MVC Models for Web Development

The Model-View-Controller (MVC) architecture is a popular design pattern used in the development of software applications. In the context of a movie rental app, the MVC architecture provides a structured and organized approach to manage the different components of the application.

- The Model component of the movie rental app represents the data and the business logic. It encapsulates entities such as movies, users, rentals, and other related data. The Model component includes the data access layer, which interacts with the underlying database or data storage system to perform operations like retrieving, creating, updating, and deleting data. The Model also handles business logic operations, such as validating user inputs, managing rental transactions, integrating with external APIs for fetching movie information, and enforcing data integrity.

- The View component in the movie rental app is responsible for presenting the user interface to the users. It encompasses all the visual elements and user experience components of the application. The View component includes screens, forms, buttons, and other user interface elements that allow users to browse movies, search for movies based on different criteria, view detailed movie information, manage their rental queue, and interact with the application. The View component is designed to be visually appealing, intuitive, and responsive to enhance the overall user experience.

- The Controller component acts as the intermediary between the Model and the View. It receives user input from the View, processes it, and interacts with the Model to fetch or update the data accordingly. The Controller component handles tasks such as processing user requests, managing user authentication and authorization, managing rental transactions, coordinating the flow of data between the Model and the View, and triggering appropriate actions based on user interactions. It ensures that the user input is validated and appropriately acted upon, orchestrating the overall functionality and behavior of the movie rental app.

By adopting the MVC architecture, the movie rental app achieves modularity, code reusability, and easier maintenance. The separation of concerns enables developers to work independently on different components, allowing for better collaboration and development efficiency. Changes in one component can be made without affecting the others, making it easier to test, debug, and enhance specific parts of the application. Moreover, the MVC architecture promotes scalability and extensibility, as new features or modifications can be incorporated without disrupting the existing functionality, facilitating the continuous evolution of the movie rental app to meet the changing needs of its users.

### 4.3. Components Design

#### 4.3.1. Users Interface:

- Users are able to access:
  - Home Page
  - Feature Movies Page
  - Movie Pages
  - TV Shows Page
  - Show Pages
  - Profile Pages
  - Login/Register Pages
  - Search Page

#### 4.3.2. Authentication Interface:

The authentication interface and features of SmashBruh are as follows:

- Oauth2 and cookie based authentication:
  - In order to streamline the registration process even further, SmashBruh has also implements the Open Authorization 2.0 protocol(Oauth2).
  - SmashBruh Oauth2 implements support registering using other well known platform such as Google, GitHUb and Facebook, providing a near instant registering experience.
  - To further increase security, SmashBruh also implements a variant cookies based authentication.
  - The token is hashed and saved to the database to prevent cookie forging, the token is hashed and set using the bcrypt and jwt library.

### 4.4. Structure and Relationships

- User:

  - Description:
    - In our website, a user can rent, rate and like as many movies or TV shows as they like, so we have built our database which revolve around such requirements. A user document is linked with 3 other documents, which are User's favorite, rental and ratings.
  - Relationship:
    - A user can have many rentals (one-to-many relationship)
    - A user can like many rentals (one-to-many relationship)
    - A user can rate many rentals (one-to-many relationship)

- Movie/Show:

  - Description:
    - Since there are more than thousands of movies and TV shows current, in order to accurately and realistically access the information, we have opted to use an online movie and show database to fetch information. This means that there are no documents to store all of the movies and shows. Instead, we only fetch what we need, and store them.
  - Relationship:
    - A movie/show can be associated with one user, user rating, user order and user favorite (one-to-one relationship)

- History:
  - Description:
    - When a user search on the web page, a copy of the search string is saved to the database to enhance the user's experience.
  - Relationship:
    - A user can have many searched strings, and a searched string can belong to many users (many-to-many relationship)
- Data Model:
  - Schema: user
    - firstName, lastName<String>: The name of the user
    - password<String>: the user’s password, hashed using bcrypt library
    - picturepath<String>: the user’s profile pictures
    - verified<bool>: a value to determine whether the user has been verified or not
    - token<String>: a token used for session control
    - FbId, GgId, ghId<String>: Data for using Oauth2 with Facebook, Google and GitHub
    - IMAGE
  - Schema: user-movie favorites
    - userID<String>: the ID of a valid user
    - movieID<String>: the ID of a movie or show
    - meida_type<String>: Used to distinguish between movies and shows. The API we are using can have 2 duplicate ID, so specifying the type is necessary
    - IMAGE
  - Schema: user-movie ratings
    - userID, movieID, media_type: Similar to user-movie favorites
    - Rating<int>: store the user’s rating
    - season<int>: an additional index that store the season of a TV show, if the rental was a movie, then this index value is 0
    - IMAGE
  - Schema: user-movie rentals
    - userID, movieID, media_type, season: Similar to user-movie favorites
    - rentalBeginDate, rentalExpireDate<date>: store the date the movie/show was rented, and the expire date
    - IMAGE
  - Schema: user-searches
    - userID: Similar to user-movie favorites
    - searchedString<String>: Store a search string, when a user searches something, a new document of this type is created.
    - IMAGE
  - Schema: movie-availability
    - movieID, media_type, season: Similar to user-movie favorites
    - isAvailable: To specify whether a particular movie or show can be rented or not. This index can only be edited by SmashBruh’s admin.
    - IMAGE

### 4.5. Data Model

| Schema             | Attributes                                                                                            |
| ------------------ | :---------------------------------------------------------------------------------------------------- |
| User               | firstName, lastName, password, picturePath, verified, balance, token, isAdmin, FbId, GgId, TwId, GhId |
| UserFavouriteMovie | userID, movieID, mediatype, season                                                                    |
| UserRateMovie      | userID, movieID, rating, mediatype, season                                                            |
| UserRentMovie      | userID, movieID, rentalBeginDate, rentalExpireDate, mediatype, season                                 |
| UserRateMovie      | userID, movieID, rating, mediatype, season                                                            |
| UserSearchHistory  | userID, searchedString, createdAt                                                                     |
|                    |                                                                                                       |

### 4.6. GUI

HOME PAGE

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/HomePage.png" alt="Home page" width="700">

LOGIN PAGE

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/LoginPage.png" alt="Login page" width="700">

FEATURE MOVIES PAGE

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/FeatureMoviePage.png" alt="Feature Movie page" width="700">

MOVIE PAGES

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/MoviePage.png" alt="Movie page" width="700">

TV SHOWS PAGE

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/TVShowsPage.png" alt="TV Shows page" width="700">

SHOW PAGES

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/ShowPage.png" alt="Show page" width="700">

PROFILE PAGES

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/ProfilePage.png" alt="Profile page" width="700">

SEARCH PAGES

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/SearchPage.png" alt="Search page" width="700">

MY LIST PAGE WHEN NO INFORMATION

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/NoInfoMyList.png" alt="No Info My List page" width="700">

MY LIST PAGE WHEN HAVE INFORMATION

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/InfoMyList.png" alt="Info My List page" width="700">

COLOR PALETTE

<img style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="Images/ColorPalette.png" alt="Color palette" width="700">

### 4.7. Functionality Design

- Key features:

- View movies/shows: display information of available movies/shows on the internet at the moment.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/homepage2.png" alt="Home Page" width="700">
<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/homepage.png" alt="Home Page" width="700">

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/movie-page.png" alt="Movie Page" width="700">

- Favourite: press heart button and that movies/shows are stored inside collections of favourites of everything.

<img style="display: block; 
                margin-left: auto;
                margin-right: auto;
                width: 100%;"
        src="Images/heartmovie.png" alt="Heart" width="700">

- Rent: rent a movie or show for a period of time then the movie or show automatically expires after the expiration day of the movie or show is exceeded.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/rentmovie.png" alt="Rent" width="700">

- Rate: rate a movie or show for a number of stars and it is stored in the database storage of individuals.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/ratemovie.png" alt="Rate" width="700">

- My list: where you can view your liked movies or tv shows

<img style="display: block; 
            margin-left: auto;
            margin-right: auto;
            width: 100%;"
    src="Images/mylist.png" alt="List 1" width="700">
<img style="display: block; 
            margin-left: auto;
            margin-right: auto;
            width: 100%;"
    src="Images/mylist2.png" alt="List 2" width="700">

- Other features:

- Search and History searched: find what users are interested in and what you searched will remain in your history up to 5 most recent searches:

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/searchmovie.png" alt="Searches" width="700">

- Recommendation: recommend based on the genres, cast of movies or shows accessed at real-time by users on any given movie and show page.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/movie-page-2.png" alt="Recommendations" width="700">

## 5. Implementation

### 5.1. File Structure

```
C:.
|   .gitlab-ci.yml
|   package-lock.json
|   README.md
|
+---documents
|   |   Database Diagram.png
|   |   filestructure.txt
|   |   report.md
|   |
|   +---Images
|   |
|   +---Sequence
|   |       Admin Sequence Diagrams.png
|   |       User Sequence Diagrams.png
|   |
|   \---Use Cases
|       \---User
|               1. Sign Up Use Case.docx
|               2. Sign In Use Case.docx
|               3. Choose Movie Use Case.docx
|               4. Search Use Case.docx
|               User Use Case Diagrams.png
|
+---server
|   |   .babelrc
|   |   .dockerignore
|   |   .env
|   |   .env.example
|   |   .gitignore
|   |   Dockerfile
|   |   index.js
|   |   package-lock.json
|   |   package.json
|   |
|   +---config
|   |       ViewEngine.js
|   |
|   +---controller
|   |       auth.js
|   |       movieAPI.js
|   |       oAuth2Controller.js
|   |       SampleController.js
|   |       user.js
|   |       UserFavouriteMovieController.js
|   |       UserRateMovieController.js
|   |       UserRentMovieController.js
|   |       UserSearchHistoryController.js
|   |
|   +---middleware
|   |       auth.js
|   |       CheckRental.js
|   |       FileUploader.js
|   |
|   +---models
|   |       EmailVerificationSchema.js
|   |       oAuth2model.js
|   |       sample.js
|   |       UserFavouriteMovieModel.js
|   |       UserFavouriteMovieSchema.js
|   |       UserRateMovieModel.js
|   |       UserRateMovieSchema.js
|   |       UserRentMovieModel.js
|   |       UserRentMovieSchema.js
|   |       UserSearchHistoryModel.js
|   |       UserSearchHistorySchema.js
|   |       UserSchema.js
|   |
|   +---public
|   |   \---assets
|   |
|   +---routes
|   |       WebRoutes.js
|   |
|   \---test
|           mockTMDB.js
|           webRoutes.test.js
|
\---views
    |   api.yaml
    |   package-lock.json
    |   verified.html
    |
    +---React
    |   |   .babelrc
    |   |   .dockerignore
    |   |   .env
    |   |   .gitignore
    |   |   Dockerfile
    |   |   index.html
    |   |   jsconfig.json
    |   |   package-lock.json
    |   |   package.json
    |   |   vite.config.js
    |   |
    |   |
    |   +---src
    |   |   |   App.css
    |   |   |   App.jsx
    |   |   |   index.css
    |   |   |   main.jsx
    |   |   |   theme.js
    |   |   |
    |   |   +---assets
    |   |   |   |
    |   |   |   |
    |   |   |   +---image
    |   |   |   |
    |   |   |   \---images
    |   |   |
    |   |   +---components
    |   |   |       FlexBetween.jsx
    |   |   |       Loading.jsx
    |   |   |       ScreenSpinner.jsx
    |   |   |       UserImage.jsx
    |   |   |
    |   |   +---scenes
    |   |   |   +---featurePage
    |   |   |   |       featureCard.jsx
    |   |   |   |       featureList.jsx
    |   |   |   |       index.jsx
    |   |   |   |
    |   |   |   +---homePage
    |   |   |   |       Carousel.jsx
    |   |   |   |       HomeList.jsx
    |   |   |   |       index.jsx
    |   |   |   |       MovieCard.jsx
    |   |   |   |       ShowDiscoveryCard.jsx
    |   |   |   |
    |   |   |   +---loginPage
    |   |   |   |       index.jsx
    |   |   |   |       NewDesign.jsx
    |   |   |   |
    |   |   |   +---moviePage
    |   |   |   |       index.jsx
    |   |   |   |
    |   |   |   +---mylistPage
    |   |   |   |       index.jsx
    |   |   |   |
    |   |   |   +---navbar
    |   |   |   |       IconListComponent.jsx
    |   |   |   |       index.jsx
    |   |   |   |       SearchBar.jsx
    |   |   |   |       Searchbar2.jsx
    |   |   |   |
    |   |   |   +---profilePage
    |   |   |   |   |   EmailVerifyDialog.jsx
    |   |   |   |   |   index.jsx
    |   |   |   |   |   NewDesign.jsx
    |   |   |   |   |   Original.jsx
    |   |   |   |   |   PaymentDialog.jsx
    |   |   |   |   |   ProfileSection.jsx
    |   |   |   |   |   StarAnimation.jsx
    |   |   |   |   |   UserImage.jsx
    |   |   |   |   |
    |   |   |   |   \---PurchaseCard
    |   |   |   |           PurchaseCard.jsx
    |   |   |   |           PurchaseCard2.jsx
    |   |   |   |           PurchaseCard3.jsx
    |   |   |   |           PurchaseCard4.jsx
    |   |   |   |           PurchaseCard5.jsx
    |   |   |   |           PurchaseCard6.jsx
    |   |   |   |
    |   |   |   +---searchPage
    |   |   |   |       index.jsx
    |   |   |   |
    |   |   |   +---showPage
    |   |   |   |       index.jsx
    |   |   |   |
    |   |   |   +---trailerPlayer
    |   |   |   |       carouselVideo.jsx
    |   |   |   |       YoutubeVideo.jsx
    |   |   |   |
    |   |   |   \---tvPage
    |   |   |           index.jsx
    |   |   |           tvCard.jsx
    |   |   |           tvList.jsx
    |   |   |
    |   |   \---states
    |   |           index.js
    |   |
    |   \---test
    |           profile.test.js
    |
    \---Sample
            test.ejs
```

### 5.2. Development Environment and Technology Stack

The development of SmashBruh Movie Renting Website requires a robust and efficient development environment to ensure the smooth creation and deployment of the platform. Here's an overview of the key components of the development environment:

- Programming Languages: JavaScript takes center stage in the development process of the SmashBruh movie renting website. As a dynamic and versatile programming language, JavaScript empowers the website with interactivity and functionality. It enables features like seamless search functionality, dynamic recommendations, interactive elements, and smooth navigation. JavaScript's integration with backend APIs ensures efficient data retrieval and real-time updates.
- Frameworks and Libraries:
  We decided to use a combination of libaries and database to assist us in implementing the app. The combination or MERN stack, consists of Node.js - a premier JavaScript web server, Express.js - a Node.js web framework, React - a client-side JavaScript framework and MongoDB - a document database. The middle or application tier of our system is built using Express and Node. Express.js serves as the server-side web framework, while Node.js acts as the robust and widely adopted JavaScript server platform. Together, these technologies form a powerful foundation for developing and delivering web applications. Express provides a streamlined and efficient framework for handling web requests and managing routes, while Node enables the execution of server-side JavaScript code, allowing for scalable and high-performance server applications.
- Database Management System:
  MongoDB, a popular NoSQL database management system, serves as the foundation for storing and managing data in the SmashBruh movie renting website. MongoDB offers a flexible and scalable approach to data storage, making it ideal for handling movie information, user profiles, rental history, and other pertinent data.
- Version Control System:
  With Git and GitLab, SmashBruh benefits from features like branch management, version control, and the ability to roll back changes if needed. This combination ensures that the development team can work concurrently, seamlessly integrate new features, resolve conflicts, and track the evolution of the codebase.
- Development Tools and Integrated Development Environment (IDE): With its intuitive interface and customizable settings, developers working on SmashBruh can personalize their coding environment according to their preferences. VS Code provides essential tools such as syntax highlighting, code completion, and linting, ensuring clean and error-free code. The built-in debugger enables efficient troubleshooting and debugging, helping to identify and fix issues quickly.
- Cloud Services: Leveraging cloud services can provide scalability, flexibility, and reliability to the website. We were able to achieve by using Vercel - a serverless platform for static and hybrid applications.
- Security Measures: Implementing robust security measures is vital to safeguard user data and protect against potential threats. This includes secure coding practices, user verification and authentication mechanisms, and also adherence to industry-standard security protocols.
- Continuous Integration and Deployment: With the help of GitLab, our implementation of CI/CD (Continuous Integration/Continuous Deployment) pipeline ensures integration of code changes, automated testing, and efficient deployment to staging and production environments.

By establishing a comprehensive development environment encompassing these components, SmashBruh can ensure efficient development processes, high-quality code, and a scalable platform that meets the needs and expectations of clients

### 5.3. CI/CD Testing, Docker and Deployment

The CI/CD pipeline automates the testing, building, and deployment of the application, ensuring efficient and reliable software delivery. The pipeline described in this document utilizes GitLab CI/CD and Docker for containerization.
The CI/CD pipeline consists of three stages: test, build and deploy. Information about each stage in detail:

1. Test Stage:

- Environment: The test stage uses the node:16 Docker image as the execution environment.
- Actions:
  - The pipeline changes the directory to views/React, removes existing nodemodules and package-lock.json files, and installs dependencies using npm install.
  - Finally, it runs the tests using the npm test command.

2. Build Stage:

- Environment: The build stage utilizes the docker image and the docker:dind service, allowing Docker commands within the job. This stage involves two actions: constructing the server application image and creating the client application image.
- Actions:
  - For the build-server-image job:
    - The pipeline changes the directory to the server
    - It performs a Docker login to the specified registry using the provided credentials.
    - The server image is built using docker build, tagged with the specified names and tags, and pushed to the registry.
  - For the build-client-image job:
    - The pipeline changes the directory to views/React.
    - It performs a Docker login to the specified registry using the provided credentials.
    - The client image is built using docker build, tagged, and pushed to the registry.

3. Deploy Stage:

- The deploy stage follows the build stage and is responsible for deploying the application to the Vercel app.
- Deploy Stage Configuration:
  - Environment: The deploy stage utilizes the Vercel app integration, which requires setting up appropriate environment variables in the Vercel app.
  - Actions: When a new commit is pushed to GitLab, the pipeline initiates the deployment process by interacting with the Vercel app.
- Deploying to Vercel:
  - The pipeline integrates with the Vercel app, which allows for easy and automated deployment of the Node.js application.

In addition to the existing CI/CD pipeline stages, there is a specific section dedicated to deploying the backend of the application to the Render app. Due to limitations in the free tier of the Render app, automated deployment of the latest backend commit is not possible. Therefore, the deployment process for the backend needs to be done manually by deploying the most recent commit.

IMAGE (X3)

### 5.5. API Utilization

#### 5.5.1. Movies

| API                | Purpose                                                                                           | Request Type | Parameter      |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------ | -------------- |
| getDetail          | allows you to retrieve detailed information about a movie based on its unique movieID.            | GET          | movieID        |
| getTrailerID       | allows you to retrieve the trailer ID(s) of a movie based on its unique movieID.                  | GET          | movieID        |
| getRecommendations | allows you to retrieve movie recommendations based on a specific movie identified by its movieID. | GET          | movieID        |
| getMovieCredits    | allows you to retrieve the credits or cast information of a movie based on its unique movieID.    | GET          | movieID        |
| getList            | allows you to retrieve a list of movies based on a specified category.                            | GET          | category, page |
|                    |                                                                                                   |              |

#### 5.5.2. TV Shows

| API                    | Purpose                                                                                        | Request Type | Parameter      |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------------ | -------------- |
| getShowDetail          | allows you to retrieve detailed information about a tv show based on its unique showID.        | GET          | showID         |
| getShowTrailerID       | API endpoint allows you to retrieve the trailer ID(s) of a show based on its unique showID.    | GET          | showID         |
| getShowRecommendations | allows you to retrieve show recommendations based on a specific show identified by its showID. | GET          | showID         |
| getShowCredits         | allows you to retrieve the credits or cast information of a show based on its unique showID.   | GET          | showID         |
| getShowList            | allows you to retrieve a list of tv shows based on a specified category.                       | GET          | category, page |
|                        |                                                                                                |              |

#### 5.5.3. Discovery

| API               | Purpose                                                                                                           | Request Type | Parameter |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------ | --------- |
| getMovieDiscovery | allows you to retrieve a list of movies based on discovery parameters, enabling users to discover popular movies. | GET          | page      |
| getShowDiscovery  | allows you to retrieve a list of tv shows based on discovery parameters, enabling users to discover top shows.    | GET          | page      |
| getImageCarousel  | allows you to retrieve a list of movies suitable for displaying in an image carousel or slideshow                 | GET          | 🚫        |
| getAnimeDiscovery | allows you to retrieve a list of anime based on discovery parameters, enabling users to discover popular anime.   | GET          | page      |
|                   |                                                                                                                   |              |

## 6. User Guide

### 6.1. Getting Started

Getting Started Guide for SmashBruh Movie Renting Website after launching Website:

1. Create an Account:
   To access all the features and benefits of SmashBruh, start by creating your account. Click on the "Sign Up" button on the homepage and provide the required information, including your name, email address, and a secure password. Once you've filled in the details, click "Finish" to proceed.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/login.png" alt="Login" width="700"> 2. Explore Movie Catalog:
After successfully creating your account, it's time to explore our extensive movie catalog. Navigate to the "Feature Movies" or "Shows" section to discover a wide range of genres. Browse through the collections, popular releases, or use the search bar to find specific movies.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/homepage.png" alt="Look up Movies" width="700">

3. Select and Rent Movies:
   When you find a movie you want to rent, click on its title to access the movie details page. Here, you'll find a synopsis, cast and crew information, user reviews, and other relevant details. Click on "Rent" to proceed to the checkout. You can also "favourite" a movie and rate them with the corresponding icons.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/movie-page.png" alt="" width="700">

4. Make Payment:
   At the checkout, review your selected movie and rental duration. SmashBruh provides secure payment options. Choose your preferred payment method, enter the required details, and click "Smash" to finalize your rental.

<img style="display: block; 
               margin-left: auto;
               margin-right: auto;
               width: 100%;"
        src="Images/rentmovie.png" alt="" width="700"> 5. Enjoy Your Movie:
Once the payment is processed successfully, you'll receive a confirmation message along with access to the movie. Head to the "My Rentals" section, where you'll find all the movies you've rented.

6. Manage Your Account:
   SmashBruh provides a user-friendly account management interface to help you keep track of your rentals, update your personal information, and manage your payment methods. Access the "My Profile" section to view and modify your profile, change your password, or update your payment details.

7. Explore Additional Features:
   While movie rentals are at the core of SmashBruh, we offer additional features to your movie-watching experience. Explore our curated playlists, personalized recommendations.

## 7. Conclusion

### 7.1. Summary of Project

In conclusion, our project aims to assist people in renting movies/shows and keeping track of their favourite movies/shows. Our web application is not a rental platform but it can acts as a middleware from clients to one if implemented correctly. With the The Movie Database as our main API, we can provide you information about every movies and TV shows that you like.

### 7.2. Future Work

- Despite facing time constraints and limited experience working on a large-scale team project, we encountered challenges in meeting deadlines and fully achieving our initial ideas and objectives. However, it is important to acknowledge the significant progress we have made and the invaluable lessons we have learned in the realms of web development and collaborative teamwork. Drawing from these experiences, we can identify future objectives aimed at refining and optimizing the app

- Parental Control System

  - With our vast database of movies and shows, it becomes necessary to address the potential exposure to explicit and graphic content. This concern is particularly crucial when our platform caters to young audiences, as it can lead to harmful interpretations and misuse of media. To mitigate these risks, we prioritize the implementation of a robust parental control system. The parental control system allows registered users to act as parents or guardians and exercise control over the content accessible to their children. By enabling this feature, explicit and inappropriate content can be effectively filtered out. This ensures that young users are protected from encountering material that is not suitable for their age group or could have a negative impact.

- Further Admin's Interface

  - Despite implementing an admin checking function and establishing a conducive work environment within the database for administrators, we currently lack dedicated admin interfaces for them to efficiently operate and moderate the system. To address this limitation, it is crucial to develop a comprehensive admin interface that offers an extensive range of functionalities. The interface should provide an overview of user information and rental details, enabling administrators to gain insights and perform necessary actions. Examples of these actions include the ability to ban or unban users, disable specific movies from being rented or viewed, and execute other administrative tasks. By providing a robust and user-friendly admin interface, we empower administrators with the tools they need to effectively carry out their responsibilities and streamline their workflow.

- Interactive Movie Discussion

  - Introduce a feature where users can engage in discussions, comment on movies, and participate in forums or live chats with other movie enthusiasts.

- Social Integration

  - Integrate social media features that allow users to share their favorite movies, reviews, and recommendations with friends.

- Augmented Reality (AR) Movie Posters

  - Users can scan movie posters using their smartphones or tablets and access interactive content such as trailers, behind-the-scenes footage, or exclusive interviews with the cast and crew.

### 7.3. References

- Color Palette: https://colorhunt.co/palette/060047b3005ee90064ff5f9e
- GitLab: https://gitlab.com/galvdat/vgutinyprojects/pe2023/vgupe2023team5
- MongoDB: https://www.mongodb.com/
- MUI Library: https://mui.com/material-ui/getting-started/overview/
- OAuth2: https://oauth.net/2/

<p style="text-align: right;">©️ Vinh Nguyen Ngoc</p>
