import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import TvList from "./tvList";
import BackgroundAnimation from "../homePage/BackgroundAnimation";
const CATEGORY_API_ENDPOINTS = {
  popular: "popular",
  topRated: "top_rated",
  airingToday: "airing_today",
  onTheAir: "on_the_air",
};

const TvPage = () => {
  const [popularShows, setPopularShows] = useState([]);
  const [popularPage, setPopularPage] = useState(1);

  const [topRatedShows, setTopRatedShows] = useState([]);
  const [topRatedPage, setTopRatedPage] = useState(1);

  const [airingTodayShows, setAiringTodayShows] = useState([]);
  const [airingTodayPage, setAiringTodayPage] = useState(1);

  const [onTheAirShows, setOnTheAirShows] = useState([]);
  const [onTheAirPage, setOnTheAirPage] = useState(1);

  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/showList?category=${CATEGORY_API_ENDPOINTS["popular"]}&page=${popularPage}`
        );
        const data = await response.json();
        setPopularShows(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularShows();
  }, [popularPage]);

  useEffect(() => {
    const fetchTopRatedShows = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/showList?category=${CATEGORY_API_ENDPOINTS["topRated"]}&page=${topRatedPage}`
        );
        const data = await response.json();
        setTopRatedShows(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopRatedShows();
  }, [topRatedPage]);

  useEffect(() => {
    const fetchAiringTodayShows = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/showList?category=${CATEGORY_API_ENDPOINTS["airingToday"]}&page=${airingTodayPage}`
        );
        const data = await response.json();
        setAiringTodayShows(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAiringTodayShows();
  }, [airingTodayPage]);

  useEffect(() => {
    const fetchOnTheAirShows = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/showList?category=${CATEGORY_API_ENDPOINTS["onTheAir"]}&page=${onTheAirPage}`
        );
        const data = await response.json();
        setOnTheAirShows(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOnTheAirShows();
  }, [onTheAirPage]);

  return (
    <Box>
      <Navbar currentPage='TV Shows' />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <BackgroundAnimation />
        </div>
      <TvList
        shows={topRatedShows}
        category="critically acclaimed"
        page={topRatedPage}
        setPage={setTopRatedPage}
      />
      <TvList
        shows={popularShows}
        category="popular"
        page={popularPage}
        setPage={setPopularPage}
      />
      <TvList
        shows={airingTodayShows}
        category="newl airing"
        page={airingTodayPage}
        setPage={setAiringTodayPage}
      />
      <TvList
        shows={onTheAirShows}
        category="On the air"
        page={onTheAirPage}
        setPage={setOnTheAirPage}
      />
      </div>
    </Box>

  );
};

export default TvPage;

// <TvPage category="airing_Today" />
// <TvPage category="on_The_Air" />
// <TvPage category="popular" />
// <TvPage category="topRated" />
