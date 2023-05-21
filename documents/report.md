## 1. SmashBruh Movie Renting Website - Documentation

### 1.1. Team member

| Full Name            | Student Id | Task                                                                                                                                                                  |
| -------------------- | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nguyễn Ngọc Vĩnh     |   18691    | Movie and TV Shows details, trailers, and recommendations backend API; UI/UX of Homepage and MoviePage; Markdown and Swagger Documentation, Login Button UI and Logic |
| Hà Quách Phú Thành   |   18840    | Backend                                                                                                                                                               |
| Thái Quang Nam       |   18770    | User Interface                                                                                                                                                        |
| Phạm Hoàng Việt      |   18334    | User Interface                                                                                                                                                        |
| Nguyễn Xuân Khang    |   18973    | Profile Interface                                                                                                                                                     |
| Nguyễn Khắc Hoàng    |   18230    | User Interface                                                                                                                                                        |
| Lê Duy               |   17434    | Sercurity                                                                                                                                                             |
| Trần Ngọc Duy Chương |   17197    | Backend                                                                                                                                                               |

### 1.2. About our project

Welcome to SmashBruh, the ultimate movie rental destination that redefines the way you experience films. Our project aims to provide a seamless and captivating movie-watching journey for cinephiles and casual viewers alike.

At SmashBruh, we understand the frustration that often accompanies the search for the perfect movie. Endless scrolling, limited availability, and the absence of detailed information can dampen the excitement of discovering new films. That's why we've created a platform that addresses these challenges and puts the power of choice in your hands.

SmashBruh goes beyond traditional movie rentals by offering convenience and flexibility. Our platform allows you to enjoy your favorite films anytime, anywhere, and on any device. Say goodbye to the limitations of physical media or the frustration of waiting for a DVD to arrive. With our seamless streaming technology, you can instantly access the movies you love, whether you're at home, on the go, or traveling abroad.

In summary, SmashBruh is not just a movie rental website; it's a gateway to a world of cinematic wonders.

## 2. Table of content

- [1. SmashBruh Movie Renting Website - Documentation](#1-smashbruh-movie-renting-website---documentation)
  - [1.1. Team member](#11-team-member)
  - [1.2. About our project](#12-about-our-project)
- [2. Table of content](#2-table-of-content)
- [3. Introduction](#3-introduction)
  - [3.1. Project Overview](#31-project-overview)
  - [3.2. Objective](#32-objective)
  - [3.3. Goals](#33-goals)
- [4. System Analysis](#4-system-analysis)
  - [4.1. Business Requirements](#41-business-requirements)
  - [4.2. User Requirements](#42-user-requirements)
  - [4.3. Functional Requirements](#43-functional-requirements)
  - [4.4. Non-Functional Requirements](#44-non-functional-requirements)
  - [4.5. Deployment Plan](#45-deployment-plan)
- [5. System Design](#5-system-design)
  - [5.1. System Architecture](#51-system-architecture)
    - [5.1.1. MVC Models for Web Development](#511-mvc-models-for-web-development)
    - [5.1.2. Interfaces](#512-interfaces)
    - [5.1.3. Microservices Architecture](#513-microservices-architecture)
  - [5.2. Components Design](#52-components-design)
    - [5.2.1. Customer Interface:](#521-customer-interface)
    - [5.2.2. Employee \& Admin Interface:](#522-employee--admin-interface)
    - [5.2.3. Authentication Interface:](#523-authentication-interface)
  - [5.3. Structure and Relationships](#53-structure-and-relationships)
  - [5.4. Data Model](#54-data-model)
  - [5.5. GUI](#55-gui)
  - [5.6. Functionality Design](#56-functionality-design)
- [6. Implementation](#6-implementation)
  - [6.1. Development Environment and Technology Stack](#61-development-environment-and-technology-stack)
  - [6.2. File Structures](#62-file-structures)
  - [6.3. Testing Plan](#63-testing-plan)
- [7. Deployment](#7-deployment)
  - [7.1. Deployment Environment](#71-deployment-environment)
  - [7.2. Installation Instructions](#72-installation-instructions)
  - [7.3. Configuration Instructions](#73-configuration-instructions)
  - [7.4. User Management and Access Control](#74-user-management-and-access-control)
- [8. User Guide](#8-user-guide)
  - [8.1. Getting Started](#81-getting-started)
  - [8.2. Features and Functions](#82-features-and-functions)
  - [8.3. User Interface](#83-user-interface)
  - [8.4. Troubleshooting](#84-troubleshooting)
- [9. Maintenance and Support](#9-maintenance-and-support)
  - [9.1. Disaster Recovery Plan](#91-disaster-recovery-plan)
- [10. Conclusion](#10-conclusion)
  - [10.1. Summary of Project](#101-summary-of-project)
  - [10.2. Future Work](#102-future-work)
  - [10.3. Acknowledgements](#103-acknowledgements)
  - [10.4. References](#104-references)

## 3. Introduction

_Let's take a closer look to our project_

### 3.1. Project Overview

SmashBruh is an innovative movie rental website that aims to transform the way people discover and enjoy movies. Our project seeks to provide a seamless and captivating movie-watching experience for cinephiles and casual viewers alike. With a vast selection of films, a user-friendly interface, detailed movie information, and personalized recommendations, SmashBruh strives to be the ultimate destination for movie enthusiasts.

### 3.2. Objective

- Extensive Movie Library: Curate a diverse collection of films across genres, eras, and cultures to cater to the varied preferences of our users. From classic masterpieces to the latest releases, ensure a wide range of options that cover different cinematic experiences.

- User-Friendly Interface: Develop an intuitive and easy-to-navigate website interface that allows users to seamlessly explore and discover movies. Implement robust search functionality, filters, and sorting options to facilitate effortless movie browsing.

- Detailed Movie Information: Provide comprehensive and accurate movie information to assist users in making informed decisions. Include detailed descriptions, plot summaries, cast and crew details, user ratings, and reviews to give users valuable insights into each film.

- Personalized Recommendations: Implement a sophisticated recommendation system that analyzes user preferences, viewing history, and feedback. Generate personalized movie suggestions that align with users' tastes, helping them discover new films and broaden their cinematic horizons.

- Seamless Streaming Experience: Utilize advanced streaming technology to ensure smooth and high-quality movie playback across various devices. Enable users to enjoy their favorite films anytime, anywhere, without the limitations of physical media.

- Easy Rental Process: Streamline the movie rental process to make it convenient and hassle-free for users. Implement a straightforward rental system where users can choose their desired movies, rental duration, and complete secure online payments.

- Customer Support: Provide responsive customer support to address any queries, issues, or feedback from users. Offer prompt assistance and maintain a positive user experience throughout their interaction with the website.

### 3.3. Goals

The SmashBruh Movie Rental Website project aims to revolutionize the way people rent and enjoy movies. By offering a vast movie library, user-friendly interface, detailed movie information, personalized recommendations, seamless streaming, and convenient rental process, SmashBruh seeks to provide an unparalleled movie-watching experience. Our goal is to create a platform where users can immerse themselves in the magic of cinema and discover new films that resonate with their interests and preferences. Join us on this exciting journey as we redefine the world of movie rentals with SmashBruh.

## 4. System Analysis

### 4.1. Business Requirements

The business requirements of SmashBruh are as follows:

- Content Licensing and Acquisition: SmashBruh requires the acquisition and licensing of a diverse range of movies and TV shows from production studios, distributors, and content creators. This ensures a comprehensive and up-to-date library of content for users to choose from.
- Secure Payment Processing: SmashBruh needs a reliable and secure payment processing system to handle transactions from users. This involves partnering with trusted payment gateways and implementing robust security measures to protect users' personal and financial information.
- User Account Management: SmashBruh requires a user account management system to allow users to create profiles, save preferences, manage their watch lists, and track their viewing history. This feature provides a personalized experience and enables users to easily access and organize their preferred content.
- Search and Recommendation Engine: The platform needs an efficient search and recommendation engine that enables users to quickly find movies and TV shows based on various criteria such as genre, cast, director, and release year. The recommendation system should be capable of analyzing user preferences and viewing patterns to suggest relevant titles.
- User Reviews and Ratings: SmashBruh requires a user review and rating system that allows users to provide feedback on movies and TV shows they have watched. This feature encourages user engagement, helps others make informed decisions, and fosters a sense of community within the platform.
- Customer Support: The platform needs a dedicated customer support system to address user inquiries, technical issues, and provide prompt assistance. This includes multiple channels of communication such as live chat, email, and phone support to ensure user satisfaction and timely resolution of any concerns.
- Cross-Platform Accessibility: SmashBruh should be accessible across different devices and platforms, including web browsers, mobile devices, and smart TVs. This ensures that users can enjoy their favorite content conveniently, regardless of the device they are using.
- Analytics and Reporting: The platform requires robust analytics and reporting capabilities to track user behavior, content popularity, and performance metrics. These insights help in making data-driven decisions, improving the user experience, and optimizing the content library.
- Integration with Content Delivery Networks (CDNs): SmashBruh needs to integrate with CDNs to ensure smooth and reliable streaming of movies and TV shows. This involves delivering content efficiently to users across different regions, minimizing buffering and latency issues.
- Compliance with Legal and Copyright Regulations: SmashBruh must adhere to legal and copyright regulations when acquiring and distributing content. This includes securing necessary licenses, respecting intellectual property rights, and implementing appropriate content protection measures.

By fulfilling these business requirements, SmashBruh can create a robust and user-friendly movie rental platform that offers a wide selection of content, personalized recommendations, secure transactions, and excellent customer support, ultimately delivering a superior entertainment experience for its users.

### 4.2. User Requirements

The user requirements of SmashBruh are as follows:

- Broad Selection of Content: Users expect a wide variety of movies and TV shows across different genres, including popular releases, classics, and niche titles. They want access to a diverse library that caters to their individual preferences and interests.
- User-Friendly Interface: Users desire an intuitive and easy-to-navigate platform that allows them to quickly find and rent movies and TV shows. They expect a clean and visually appealing interface that enhances their browsing and selection experience.
- Efficient Search and Filtering: Users require an efficient search functionality that allows them to search for specific titles, genres, actors, directors, or keywords. They also expect advanced filtering options to refine their search results based on criteria such as release year, ratings, and language.
- Personalized Recommendations: Users appreciate personalized recommendations based on their viewing history, ratings, and preferences. They expect the platform to suggest relevant movies and TV shows that align with their interests, helping them discover new content.
- Ratings and Reviews: Users value the ability to read and contribute to ratings and reviews for movies and TV shows. They want a platform that encourages user feedback, enabling them to make informed decisions and engage in discussions with other movie enthusiasts.
- Flexible Rental Options: Users prefer flexible rental options, including both streaming content online and renting physical DVDs for delivery. They want the freedom to choose the rental method that suits their preferences and viewing habits.
- Reliable Streaming Quality: Users expect a reliable streaming experience with high-quality video and audio playback. They want minimal buffering, smooth playback, and support for various screen sizes and resolutions.
- Cross-Platform Compatibility: Users want the flexibility to access SmashBruh on multiple devices, including web browsers, smartphones, tablets, and smart TVs. They expect a seamless experience that allows them to pick up where they left off across different devices.
- Secure Payment Processing: Users require a secure and trustworthy payment processing system. They want assurance that their payment information is protected, and they expect a variety of payment options to choose from, including credit cards, debit cards, and trusted third-party processors.
- Responsive Customer Support: Users appreciate responsive and helpful customer support. They expect prompt assistance in case of technical issues, billing inquiries, or any other concerns they may have. Multiple support channels, such as live chat, email, and phone support, are valued.

By addressing these user requirements, SmashBruh can provide a user-centric experience that meets the expectations of movie enthusiasts, offering them a vast selection of content, seamless navigation, personalized recommendations, reliable streaming, and excellent customer support.

### 4.3. Functional Requirements

The functional requirements of SmashBruh are as follows:

- User Registration and Account Management:
  - Users should be able to create an account and provide necessary information.
  - Users should be able to log in securely and manage their account settings.
- Content Catalog and Search:
  - The platform should maintain a comprehensive catalog of movies and TV shows.
  - Users should be able to search for content by title, genre, cast, director, and other relevant criteria.
  - Advanced filtering options should be available to refine search results.
- Movie and TV Show Details:
  - Users should be able to view detailed information about each movie or TV show, including synopsis, cast, director, ratings, and reviews.
  - The platform should display relevant recommendations and similar content.
- Rental and Streaming Options:
  - Users should be able to select rental options, such as streaming online or renting physical DVDs.
  - The platform should provide pricing details, rental durations, and availability information.
- Payment Processing:
  - The platform should securely process payments using various payment methods, including credit cards, debit cards, and third-party processors.
  - Users should receive confirmation and receipts for their rental transactions.
- Watch list and Personalization:
  - Users should be able to create and manage a watch list of movies and TV shows.
  - The platform should provide personalized recommendations based on user preferences, viewing history, and ratings.
- Ratings and Reviews:
  - Users should be able to rate movies and TV shows and leave written reviews.
  - The platform should display average ratings and aggregate reviews for each title.
- User Interactions and Community Features:
  - Users should be able to interact with other users through comments, likes, and sharing features.
  - The platform should facilitate discussions and engagement among users, fostering a community of movie enthusiasts.
- Cross-Platform Accessibility:
  - The platform should be accessible across devices and platforms, including web browsers, mobile devices, and smart TVs.
  - Users should be able to seamlessly switch between devices and continue watching from where they left off.
- Customer Support:
  - The platform should provide customer support through multiple channels, such as live chat, email, and phone.
  - Users should be able to receive prompt assistance with inquiries, technical issues, or other concerns.
- Analytics and Reporting:
  - The platform should collect and analyze data to generate insights on user behavior, content popularity, and platform performance.
  - Administrators should have access to reporting tools for monitoring and improving the platform's performance.

By fulfilling these functional requirements, SmashBruh can deliver a robust and feature-rich movie rental platform that provides seamless content discovery, rental options, payment processing, personalization, user interactions, and support, ultimately enhancing the overall user experience.

### 4.4. Non-Functional Requirements

The non-functional requirements of SmashBruh are as follows:

- Performance:
  - The platform should have fast loading times and responsive navigation to provide a seamless user experience.
  - Streaming of movies and TV shows should be smooth and uninterrupted, with minimal buffering.
- Scalability:
  - The platform should be designed to handle a growing user base and increasing traffic without compromising performance.
  - It should be scalable to accommodate a large number of concurrent users and a growing content library.
- Security:
  - The platform should implement robust security measures to protect users' personal information, payment details, and viewing history.
  - Secure encryption protocols should be used to ensure the confidentiality and integrity of data.
- Availability:
  - The platform should have a high level of availability, minimizing downtime and ensuring users can access the service whenever they need it.
  - Measures such as redundancy, load balancing, and backup systems should be in place to maintain availability.
- Compatibility:
  - The platform should be compatible with various operating systems, web browsers, and devices to accommodate a wide range of user preferences.
  - It should adapt to different screen sizes and resolutions, providing a consistent and optimized experience across devices.
- Usability:
  - The platform should have a user-friendly and intuitive interface, making it easy for users to navigate, search for content, and manage their account.
  - Clear and concise instructions and tooltips should be provided to guide users through different features and functionalities.
- Accessibility:
  - The platform should adhere to accessibility standards, ensuring that users with disabilities can access and use the service.
  - Support for assistive technologies, such as screen readers and keyboard navigation, should be provided.
- Data Privacy:
  - The platform should comply with data protection regulations and ensure the privacy of user data.
  - Clear privacy policies and consent mechanisms should be in place, informing users about data collection, storage, and usage practices.
- Performance Monitoring and Optimization:
  - The platform should have monitoring mechanisms in place to track performance metrics, identify bottlenecks, and optimize system performance.
  - Regular performance testing and optimization should be conducted to ensure optimal user experience.
- Multilingual and Internationalization Support:
  - The platform should support multiple languages to cater to users from different regions.
  - Localization features, such as localized content, currency, and date formats, should be implemented to enhance the user experience for international users.

By meeting these non-functional requirements, SmashBruh can provide a reliable, secure, and user-friendly movie rental platform that offers excellent performance, availability, compatibility, and accessibility to enhance user satisfaction and engagement.

### 4.5. Deployment Plan

- Infrastructure Setup: Determine the hosting environment for your application, whether it's a cloud-based solution like on-premises server. Set up the necessary infrastructure, including MongoDB servers, databases, and networking components, ensuring scalability, reliability, and security.

- Code Packaging: Prepare your application for deployment by packaging the code, including all dependencies, libraries, and configurations, into a deployable package. This may involve bundling the frontend code (HTML, CSS, JavaScript, MUI Libray for CSS) and containerizing the backend code using technologies like Docker.

- Configuration Management: Define and manage the application's configuration settings, such as database credentials, API keys, and other environment-specific variables. Ensure that these settings are securely stored and easily configurable for different deployment environments (e.g., development, staging, production).

- Testing and Quality Assurance: Conduct thorough testing of the application to identify and fix any issues or bugs. Perform functional testing, integration testing, and load testing to ensure the application performs well under expected loads and behaves as intended.

- Data Migration: If you are migrating from a previous version of the application or integrating with existing data sources, plan and execute a data migration strategy to ensure a smooth transition of data to the new deployment environment. This may involve transforming and importing data from legacy systems or integrating with external APIs.

- Deployment Automation: Implement an automated deployment process using tools like GitLab CI/CD. This allows for consistent and efficient deployment of new code changes, reduces human error, and enables easy rollbacks if necessary.

- Monitoring and Error Logging: Set up monitoring and logging systems to track the health, performance, and usage of your application. Implement error tracking and logging mechanisms to identify and resolve issues promptly, ensuring the application runs smoothly and providing valuable insights for future improvements.

- Security Measures: Implement robust security measures to protect the application and user data. This includes implementing user authentication and authorization mechanisms, and applying security best practices to safeguard against common web vulnerabilities.

- User Acceptance Testing: Conduct user acceptance testing with a select group of users to gather feedback, identify any usability issues, and validate that the application meets their expectations. Make necessary adjustments based on user feedback before the final release.

## 5. System Design

### 5.1. System Architecture

The movie rental application follows a client-server architecture. On the client-side (frontend), the user interface provides an interactive platform where users can browse movies, search and filter based on various criteria, view movie details including trailers and reviews, manage their rental queue, and access personalized recommendations. User authentication ensures secure access to user-specific features and account management. On the server-side (backend), the application server hosts the core business logic, handling user requests, processing data, and generating responses. It utilizes a database management system to store movie data, user profiles, rental history, and other relevant information. APIs enable communication between the frontend and backend, facilitating operations such as retrieving movie data, managing user accounts, processing rental requests, and generating recommendations. Integration with a payment gateway ensures secure payment transactions for renting movies. Content delivery and streaming rely on a content delivery network (CDN) for efficient content distribution and a video streaming infrastructure to encode, store, and deliver movie content in different formats. Digital rights management (DRM) technologies protect copyrighted content and enforce access restrictions. External integrations include fetching movie metadata from providers like TMDB API, integrating with a payment gateway for secure transactions, and utilizing recommendation engines to generate personalized movie recommendations based on user preferences and viewing history.

#### 5.1.1. MVC Models for Web Development

- Client-side (Frontend):

  - User Interface: The frontend layer includes the user interface components that users interact with, such as web pages or mobile applications.
  - User Authentication: Handles user authentication and authorization processes, allowing users to log in, sign up, and manage their accounts.
  - Movie Catalog: Displays the available movies, genres, ratings, and other relevant information.
  - Search and Filtering: Enables users to search for movies based on various criteria like title, genre, actors, and ratings.
  - Movie Details: Provides detailed information about selected movies, including trailers, synopsis, cast, and user reviews.
  - User Dashboard: Allows users to manage their rental queue, view their rental history, and access personalized recommendations.

- Server-side (Backend):

  - Application Server: Handles the core business logic, processing user requests, and generating responses. It may utilize a web framework or microservices architecture.
  - Database Management: Stores movie data, user profiles, rental history, and other relevant information. This typically involves a database called TMDB API and MongoDB
  - APIs: Exposes a set of APIs to enable communication between the frontend and backend systems. APIs facilitate operations such as retrieving movie data, managing user accounts, processing rental requests, and generating recommendations from TMDB API.
  - Payment Gateway Integration: Integrates with a payment gateway to handle secure payment transactions for renting movies, including processing payments, handling refunds, and managing user billing information.

- Content Delivery and Streaming:

  - Content Delivery Network (CDN): Utilizes a CDN to deliver movie content efficiently to users, ensuring fast and reliable streaming experiences by serving content from geographically distributed servers.
  - Video Streaming Infrastructure: Implements a video streaming infrastructure that encodes, stores, and delivers movie content from Youtube API to support streaming on different devices and bandwidths.
  - Digital Rights Management (DRM): Incorporates DRM technologies to protect copyrighted content and enforce access restrictions based on user permissions.

- External Integrations:

  - Movie Metadata Providers: By fetching data from TMDB API integrating with external movie metadata providers to retrieve detailed movie information, including titles, synopses, posters, and cast details.
  - Payment Gateway: simple net balance temporary account to store our creative currency (SmashDong) with simple calculation (addition, subtraction) with the rental system
  - Recommendation Engines: Integrates with recommendation engines to generate personalized movie recommendations based on user real-time accessed movies and shows.

#### 5.1.2. Interfaces

#### 5.1.3. Microservices Architecture

### 5.2. Components Design

#### 5.2.1. Users Interface:

- Users are able to access:
  - Home Page
  - Feature Movies Page
  - Movie Pages
  - TV Shows Page
  - Show Pages
  - Profile Pages
  - Login/Register Pages

#### 5.2.2. Admin Interface:

#### 5.2.3. Authentication Interface:

### 5.3. Structure and Relationships

### 5.4. Data Model

### 5.5. GUI

### 5.6. Functionality Design

## 6. Implementation

### 6.1. Development Environment and Technology Stack

The development of SmashBruh Movie Renting Website requires a robust and efficient development environment to ensure the smooth creation and deployment of the platform. Here's an overview of the key components of the development environment:

- Programming Languages: The website development may involve the use of multiple programming languages. The backend development can be implemented using languages such as Python, Java, or Ruby, while the frontend can be built with HTML, CSS, and JavaScript.
- Frameworks and Libraries: Leveraging frameworks and libraries can expedite development and enhance functionality. Backend frameworks like Django or Ruby on Rails provide a solid foundation for building robust web applications. Frontend frameworks such as React, Angular, or Vue.js can be employed to create dynamic and responsive user interfaces.
- Database Management System: A reliable database management system is crucial for storing and managing movie data, user information, rental history, and other relevant data. Common choices include MySQL, PostgreSQL, or MongoDB, depending on the specific requirements of the project.
- Version Control System: Utilizing a version control system like Git allows for efficient collaboration among developers and helps track changes made to the codebase. It enables seamless integration of new features, bug fixes, and rollbacks when necessary.
- Development Tools and Integrated Development Environment (IDE): Developers may work with various tools and IDEs to streamline the development process. These include code editors such as Visual Studio Code, Atom, or Sublime Text, which provide syntax highlighting, code completion, and debugging capabilities. Additionally, task runners like Grunt or Gulp can automate repetitive tasks and optimize performance.
- Testing Frameworks: Testing is a crucial aspect of the development process to ensure the website's functionality, stability, and security. Testing frameworks like Selenium or Jest can be used for automated testing, while tools like Postman assist in API testing.
- Cloud Services: Leveraging cloud services can provide scalability, flexibility, and reliability to the website. Cloud platforms such as Amazon Web Services (AWS), Microsoft Azure, or Google Cloud can be utilized for hosting, storage, and managing infrastructure components.
- Security Measures: Implementing robust security measures is vital to safeguard user data and protect against potential threats. This includes secure coding practices, encryption techniques, user authentication mechanisms, and adherence to industry-standard security protocols.
- Agile Development Methodology: Adopting an agile development methodology, such as Scrum or Kanban, promotes collaboration, flexibility, and iterative development. This allows for continuous improvement, regular feedback, and faster delivery of features to meet user expectations.
- Continuous Integration and Deployment: Implementing a CI/CD (Continuous Integration/Continuous Deployment) pipeline ensures seamless integration of code changes, automated testing, and efficient deployment to staging and production environments.
- Monitoring and Analytics: Incorporating monitoring and analytics tools enables the tracking of website performance, user behavior, and system health. Tools like Google Analytics or New Relic can provide valuable insights for optimization and maintenance purposes.

By establishing a comprehensive development environment encompassing these components, SmashBruh can ensure efficient development processes, high-quality code, and a scalable platform that meets the needs and expectations of movie enthusiasts.

### 6.2. File Structures

### 6.3. Testing Plan

## 7. Deployment

### 7.1. Deployment Environment

### 7.2. Installation Instructions

### 7.3. Configuration Instructions

### 7.4. User Management and Access Control

## 8. User Guide

### 8.1. Getting Started

Getting Started Guide for SmashBruh after launching the Website:

1. Create an Account:
   To access all the features and benefits of SmashBruh, start by creating your account. Click on the "Sign Up" button on the homepage and provide the required information, including your name, email address, and a secure password. Once you've filled in the details, click "Create Account" to proceed.

1. Explore Movie Catalog:
   After successfully creating your account, it's time to explore our extensive movie catalog. Navigate to the "Movies" section to discover a wide range of genres, from action-packed blockbusters to heartwarming dramas and everything in between. Browse through the curated collections, popular releases, or use the search bar to find specific movies.

1. Select and Rent Movies:
   When you find a movie you want to watch, click on its title to access the movie details page. Here, you'll find a synopsis, cast and crew information, user reviews, and other relevant details. If you're ready to watch the movie, select the rental option that suits you best. SmashBruh offers flexible rental durations, including 24 hours, 48 hours, or even a weekend pass. Click on "Rent Now" to proceed to the checkout.

1. Make Payment:
   At the checkout, review your selected movie and rental duration. SmashBruh provides secure payment options to ensure a seamless transaction experience. Choose your preferred payment method, enter the required details, and click "Confirm Payment" to finalize your rental.

1. Enjoy Your Movie:
   Once the payment is processed successfully, you'll receive a confirmation message along with access to the movie. Head to the "My Rentals" section, where you'll find all the movies you've rented. Click on the movie you want to watch, and sit back, relax, and enjoy the cinematic experience right from the comfort of your own home.

1. Manage Your Account:
   SmashBruh provides a user-friendly account management interface to help you keep track of your rentals, update your personal information, and manage your payment methods. Access the "My Account" section to view and modify your profile, change your password, or update your payment details.

1. Explore Additional Features:
   While movie rentals are at the core of SmashBruh, we offer additional features to enhance your movie-watching experience. Explore our curated playlists, personalized recommendations, or engage in discussions with fellow movie enthusiasts through our vibrant community forums.

1. Provide Feedback:
   Your feedback is invaluable to us as we continuously strive to improve our services. If you have any suggestions, concerns, or inquiries, don't hesitate to reach out to our customer support team. We're here to assist you and ensure you have the best possible experience on SmashBruh.

### 8.2. Features and Functions

### 8.3. User Interface

### 8.4. Troubleshooting

## 9. Maintenance and Support

### 9.1. Disaster Recovery Plan

## 10. Conclusion

### 10.1. Summary of Project

### 10.2. Future Work

### 10.3. Acknowledgements

### 10.4. References
