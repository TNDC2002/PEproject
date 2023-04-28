# REPORT<a name = "report">
## Preface<a name = "preface">
- [REPORT](#report)
  - [Preface](#preface)
  - [Member](#member)
  - [Introduction](#introduction)
    - [Overview](#overview)
    - [Technology](#technology)
  - [UX/UI](#uxui)
    - [Overview ](#overview-)
    - [Pages and Images](#pages-and-images)
  - [Functionality](#functionality)
    - [Movie Fetching](#movie-fetching)
    - [Showcase Movie Trailer](#showcase-movie-trailer)
    - [Search Engine](#search-engine)
    - [Payment System](#payment-system)
  - [Performance and Sercurity](#performance-and-sercurity)
  - [Test Case](#test-case)
  - [Summary](#summary)
## Member<a name = "member">
| Full Name  | Student Id | Task |
| ---------  | :---: | :--- |
| Nguyễn Ngọc Vĩnh  | 18691 | Documentation, Data API |
| Hà Quách Phú Thành | 18840 | Backend |
| Thái Quang Nam | 18770 | User Interface |
| Phạm Hoàng Việt | 18334 | User Interface |
| Nguyễn Xuân Khang | 18973 | Profile Interface |
| Nguyễn Khắc Hoàng | 18230 | User Interface |
| Lê Duy | 17434 | Sercurity |
| Trần Ngọc Duy Chương | 17197 | Backend |
## Introduction<a name = "introduction">
### Overview<a name = "overview">
>Our **movie renting website** offers the following features to ensure a diverse and convenient user experience:
>- **Extensive movie selection**: We strive to offer an extensive and diverse selection of movies from every genre, year, and more, ensuring there is something for every user's taste.
>- **Rental model**: Users can browse through a vast catalog of available movies and rent specific titles for a limited period by paying a rental fee.
>- **User account**: Users can create an account on our website to access features such as user reviews, ratings, personalized recommendations based on viewing history, and a search function to help them find specific titles.
>- **Secure payment system**: Our website offers a secure payment system to process transactions and protect users' sensitive information.
>- **Affordable rental model**: We aim to provide a convenient and affordable rental model for our users, making it accessible to everyone.
### Technology<a name="technology">
>Our movie renting website is built using the **MERN** stack, with the addition of the **Material-UI** (MUI) library for the user interface. This includes the following technologies:
>- **MongoDB**: a document-based NoSQL database used to store and manage movie data, user data, and transactional data.
>- **Express**: a web application framework used to build the backend API that communicates with the database and provides functionality for the frontend of the website.
>- **React**: a front-end JavaScript library used to build the user interface and manage the state of the website.
>- **Node.js**: a JavaScript runtime environment used to execute server-side code and provide a backend for the website.
>- **Material-UI (MUI)**: a popular React component library that provides pre-built, customizable UI components for building modern and responsive user interfaces.
## UX/UI<a name = "uxui">
### Overview <a name = "overview-1">
> The **Smash Bruh** movie renting website offers the following features:
>- **Visually appealing UI**: The website's UI is designed to be visually appealing and user-friendly, providing a pleasant and intuitive browsing experience.
>- **Easy Navigation**: Users can quickly navigate to different parts of the website, such as the movie page to view details and trailers, the settings page to customize their preferences, or the "My Favorites" page to access their saved movies. 
>- **Responsive and accessible design**: The website is intuitive and responsive, optimized for both desktop and mobile devices, making it easy for users to navigate and rent movies from any device.
### Pages and Images<a name="pages-and-images">
>Our website offers a variety of **user-friendly** and **informative** pages to enhance your movie rental experience. Here are some of the key features of our four main pages:
>- **Home Page**: The homepage is designed to be user-friendly and informative, featuring relevant images to accompany movie titles and descriptions, as well as a search bar and categories to help users easily find the movies they are interested in.
>- **Movie Page**: The movie page includes a detailed description of the movie, as well as information such as the cast, director, and release year. It also displays user reviews and ratings, as well as related movies that users may be interested in.
>- **Settings Page**: The settings page allows users to customize their experience on the website, including options such as language preferences, notification settings, and account information.
>- **My Favorites Page**: The "My Favorites" page displays a user's saved list of favorite movies, allowing them to easily access and rent them again in the future.
## Functionality<a name = "functionality">
### Movie Fetching<a name="movie-fetching">
> As the world of cinema continues to expand with new movies and genres, navigating it can be an overwhelming task. That's why our system is designed to provide a **comprehensive and highly informative** platform for movie exploration and discovery, leveraging the extensive data available through the **TMDB[^1] database API**.
>- **Extensive collection of data**: The TMDB API offers a vast repository of movie-related data, including plot summaries, cast information, user reviews, and ratings. This wealth of information can be invaluable for users looking to explore the world of cinema.
>- **Regular updates**: The TMDB API is regularly updated with new movie releases, ensuring that users have access to the latest information on new and upcoming movies.
>- **Customizable queries**: The TMDB API allows users to customize their queries to retrieve only the data they need. This can save time and resources by reducing the amount of irrelevant data that needs to be processed.
>- **Integration with other applications**: The TMDB API can be integrated with other applications, such as movie review websites or mobile apps, to provide a seamless and comprehensive user experience.
>- **Community-driven**: The TMDB API is maintained by a community of movie enthusiasts and developers, ensuring that it remains up-to-date and relevant to the needs of its users.

**GET /api/movie/list?category=<category>&page=<page_number>**  
```js
RESPONSE
{
  "page": number,
  "results": [
    {
      "adult": boolean,
      "backdrop_path": string,
      "genre_ids": [
        number
      ],
      "id": number,
      "original_language": string,
      "original_title": string,
      "overview": string,
      "popularity": number,
      "poster_path": string,
      "release_date": string,
      "title": string,
      "video": boolean,
      "vote_average": number,
      "vote_count": number
    },
    ...
  ]
}
```

### Showcase Movie Trailer<a name = "showcase-movie-trailer">
> Our website can utilize the following **APIs** to display **movie trailers** for users:
>- **TMDB API**: Fetches movie information using the movie ID, including details such as the movie title, release date, synopsis, and more.
>- **YouTube V3 API[^2]**: Searches for the corresponding trailer using the movie title and release date, and retrieves the video ID.
>- **React YouTube API**: Embeds the trailer video into our website using the retrieved video ID.
```jsx YoutubePlayer
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';

const YouTubePlayer = ({ videoId }) => {
  return (
    <Box sx={{ backgroundColor: 'black', padding: '0 0%', display: 'flex', justifyContent: 'center' }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls={true}
        playing={true}
        volume={1.0}
      />
    </Box>
  );
};

export default YouTubePlayer;
```
### Search Engine<a name="search-engine">
> At the heart of our movie renting webpage is a powerful **search engine** that helps users find the movies they want to watch quickly and easily. Here's an overview of how it works:
>- **Utilizing the TMDB API**: Our search engine harnesses the power of the TMDB API to retrieve movie information from a vast database. By leveraging the movie ID, the API can retrieve details such as the movie title, release date, synopsis, cast, and ratings.
>- **Employing Fuzzy Matching Algorithms**: To help users find the right movies, we use fuzzy matching algorithms that take into account the similarity between the user's search query and the movie titles in our database. This allows us to return a list of search results that are tailored to the user's interests.
>- **Ranking Results by Popularity and Release Date**: To improve the accuracy of the search results, our search engine uses data such as the movie's popularity and release date to rank the results. This ensures that the most relevant and recent movies appear at the top of the search results.
### Payment System<a name = "payment-system">
> At our movie renting website, we understand that the payment process needs to be **simple, secure, and seamless**. That's why we've developed a payment system that is easy to use and ensures that users can rent movies quickly and securely. Here's an overview of how it works:
>- **Payment Gateway Integration**: Our payment system integrates with leading payment gateways, such as PayPal and Stripe, to ensure that users can pay using their preferred payment method.
>- **Secure Transactions**: We take security seriously and use SSL encryption to ensure that all payment transactions are secure and protected from unauthorized access
>- **User-Friendly Interface**: Our payment system has a user-friendly interface that guides users through the payment process step-by-step, making it easy for them to rent movies.
>- **Automatic Billing**: To make renting movies even easier, we offer automatic billing, so users don't have to worry about remembering to pay for their rental. Once the rental period is over, we automatically charge the user's payment method on file.
>- **Refunds and Cancellations**: We understand that sometimes plans change, so we offer easy refunds and cancellations. Users can cancel their rental or request a refund with just a few clicks, and our customer support team is always available to help if needed.

## Performance and Sercurity
    - Performance
    - Sercurity

## Test Case
    - Test Case 1
    - Test Case 2
  
## Summary
>Our rental movie website offers a vast selection of movies with personalized recommendations, user-friendly search options, and secure payment processing. With a responsive design optimized for all devices and prioritizing user feedback, our service provides a seamless and convenient rental model for all users.

[^1]: *TMDb stands for The Movie Database, which is an online database of information related to movies, TV shows, and other forms of visual entertainment. It provides a platform for users to discover information about movies, including release dates, cast and crew members, plot summaries, reviews, and ratings. TMDb is free to use and is maintained by a community of volunteers who contribute content to the site. It also offers an API that allows developers to access its database and use its information in their own applications.*
[^2]: *The YouTube v3 API is a tool provided by Google for developers to interact with YouTube's platform. It allows developers to perform tasks such as uploading videos, managing playlists, and retrieving video analytics data. It was released in 2015 to replace the previous v2 API and supports OAuth 2.0 authentication, JSON and XML data formats, and new features such as live streaming data and caption management.*