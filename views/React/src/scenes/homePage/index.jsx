import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import MovieList from "./MovieList";
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";
import backgroundImage from "../../images/background.png";

const HomePage = () => {
    return (
        <Box>
            <img src={backgroundImage} height="100%" width="100%"/>
            <Navbar/>
            <YouTubePlayer videoId={"Aza6MSNBadY"}/>
            <MovieList category="popular" />
            <MovieList category="nowPlaying" />
            <MovieList category="topRated" />
            <MovieList category="upcoming" />3
        </Box>
    );
};

export default HomePage;
