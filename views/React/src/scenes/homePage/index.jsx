import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import MovieList from "./MovieList";
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";
import backgroundImage from "../../images/background.png";

const CATEGORY_API_ENDPOINTS = {
    popular: "popular",
    nowPlaying: "now_playing",
    topRated: "top_rated",
    upcoming: "upcoming",
  };

const HomePage = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularPage, setPopularPage] = useState(1);

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [nowPlayingPage, setNowPlayingPage] = useState(1);

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedPage, setTopRatedPage] = useState(1);

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [upcomingPage, setUpcomingPage] = useState(1);

    useEffect(() => {
        const fetchPopularMovies = async () => {
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["popular"]}&page=${popularPage}`);
            const data = await response.json();
            setPopularMovies(data.results);
          } catch (error) {
            console.error(error);
          }
            };
        fetchPopularMovies();
    }, [popularPage]);

    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["nowPlaying"]}&page=${nowPlayingPage}`);
            const data = await response.json();
            setNowPlayingMovies(data.results);
          } catch (error) {
            console.error(error);
          }
            };
        fetchNowPlayingMovies();
    }, [nowPlayingPage]);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["topRated"]}&page=${topRatedPage}`);
            const data = await response.json();
            setTopRatedMovies(data.results);
          } catch (error) {
            console.error(error);
          }
            };
        fetchTopRatedMovies();
    }, [topRatedPage]);

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["upcoming"]}&page=${upcomingPage}`);
            const data = await response.json();
            setUpcomingMovies(data.results);
          } catch (error) {
            console.error(error);
          }
            };
        fetchUpcomingMovies();
    }, [upcomingPage]);

    return (
        <Box>
            <Navbar/>
            <YouTubePlayer videoId={"eLI3PeE0a6I"}/>
            <MovieList movies={popularMovies} category="popular" page={popularPage} setPage={setPopularPage}/>
            <MovieList movies={nowPlayingMovies} category="nowPlaying" page={nowPlayingPage} setPage={setNowPlayingPage}/>
            <MovieList movies={topRatedMovies} category="topRated" page={topRatedPage} setPage={setTopRatedPage}/>
            <MovieList movies={upcomingMovies} category="upcoming" page={upcomingPage} setPage={setUpcomingPage}/>
        </Box>
    );
};

export default HomePage;
