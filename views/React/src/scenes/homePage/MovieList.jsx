import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import FlexBetween from "../../components/FlexBetween";
import { Grid, IconButton, Box, Typography} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CATEGORY_API_ENDPOINTS = {
    popular: "popular",
    nowPlaying: "now_playing",
    topRated: "top_rated",
    upcoming: "upcoming",
  };

const MovieList = ({ category }) => {
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
      <div>
        <h2>{category.toUpperCase()} MOVIES</h2>
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <FlexBetween>
          <IconButton onClick={handlePrevPage} disabled={page === 1}>
            <ArrowBack></ArrowBack>
          </IconButton>
          <Typography>{page}</Typography>
          <IconButton onClick={handleNextPage}>
            <ArrowForward></ArrowForward>
          </IconButton>
        </FlexBetween>
      </div>
    );
};

export default MovieList;
