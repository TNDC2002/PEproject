import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import FeatureList from "./featureList";

const CATEGORY_API_ENDPOINTS = {
  popular: "popular",
  nowPlaying: "now_playing",
  topRated: "top_rated",
  upcoming: "upcoming",
};

const FeaturePage = () => {
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
        const response = await fetch(
          `http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["popular"]}&page=${popularPage}`
        );
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
        const response = await fetch(
          `http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["nowPlaying"]}&page=${nowPlayingPage}`
        );
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
        const response = await fetch(
          `http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["topRated"]}&page=${topRatedPage}`
        );
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
        const response = await fetch(
          `http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS["upcoming"]}&page=${upcomingPage}`
        );
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
      <Navbar />
      <FeatureList
        movies={popularMovies}
        category="popular"
        page={popularPage}
        setPage={setPopularPage}
      />
      <FeatureList
        movies={nowPlayingMovies}
        category="nowPlaying"
        page={nowPlayingPage}
        setPage={setNowPlayingPage}
      />
      <FeatureList
        movies={topRatedMovies}
        category="topRated"
        page={topRatedPage}
        setPage={setTopRatedPage}
      />
      <FeatureList
        movies={upcomingMovies}
        category="upcoming"
        page={upcomingPage}
        setPage={setUpcomingPage}
      />
    </Box>
  );
};

export default FeaturePage;
