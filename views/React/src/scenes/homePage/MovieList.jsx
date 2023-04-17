import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import FlexBetween from "../../components/FlexBetween";
import { Grid, IconButton, Box, Typography} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS[category]}`);
            const data = await response.json();
            setMovies(data.results);
          } catch (error) {
            console.error(error);
          }
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
            fontSize: '1rem',
            backgroundColor: 'white',
            padding: '0.5rem',
            margin: '1rem 0.5rem',
            border: 'hidden',
            borderRadius: '0.5rem '
          }}>{page}</Typography>
          <IconButton onClick={handleNextPage} sx={{
            padding: '0 0.5rem 0 0'
          }}>
            <ArrowForwardIos sx={{ color: 'white' }}></ArrowForwardIos>
          </IconButton>
        </FlexBetween>
      </Box>
    );
};

export default MovieList;
