import { useState, useEffect } from "react";
import axios from "axios";
import FeatureCard from "./FeatureCard";
import FlexBetween from "../../components/FlexBetween";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CATEGORY_API_ENDPOINTS = {
  popular: "popular",
  nowPlaying: "now_playing",
  topRated: "top_rated",
  upcoming: "upcoming",
};

const FeatureList = ({ category }) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);


  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${CATEGORY_API_ENDPOINTS[category]}?api_key=37be93e690e7adb076e5110e93fda06f&language=en-US&page=${page}`);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [category, page]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{
        margin: '1rem 1.15rem',
        fontWeight: 'bold',
        color: 'white'
      }}> {category.toUpperCase()} MOVIES </Typography>
      <Grid container spacing={2.25} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <FlexBetween>
        <IconButton onClick={handlePrevPage} disabled={page === 1} sx={{
          padding: '0 0 0 0.5rem'
        }}>
          <ArrowBackIos fontSize="30px" sx={{ color: 'white' }}></ArrowBackIos>
        </IconButton>
        <Typography sx={{
          color: 'black',
          fontWeight: 'bold',
          color: 'white'
        }}> {category.toUpperCase()} Movies </Typography>
        <Grid container spacing={2.25} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <FeatureCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <FlexBetween>
          <IconButton onClick={handlePrevPage} disabled={page === 1} sx={{
            padding: '0 0 0 0.5rem'
          }}>
            <ArrowBackIos sx={{ fontSize: '30px', color: 'white', margin: '0 0.75rem' }}></ArrowBackIos>
          </IconButton>
          <Typography sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            padding: '0.5rem',
            margin: '1rem 0.5rem',
            border: 'hidden',
            borderRadius: '0.5rem '
          }}>{page}</Typography>
          <IconButton onClick={handleNextPage} sx={{
            padding: '0 0.5rem 0 0'
          }}>
            <ArrowForwardIos sx={{ fontSize: '30px', color: 'white', margin: '0 0.75rem'  }}></ArrowForwardIos>
          </IconButton>
        </FlexBetween>
        </FlexBetween>
      </Box>
    );
};

export default FeatureList;
