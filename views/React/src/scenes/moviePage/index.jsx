import { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Image from 'mui-image';
import { useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import {
  Box,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from "@mui/material";
import FavoriteBorderOutlinedIcon 
from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon 
from '@mui/icons-material/FavoriteOutlined';
import YouTubePlayer from "./YoutubeVideo";

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const { movieID } = useParams();
  const user = useSelector((state) => state.user);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isRented, setIsRented] = useState(false);

  const favourite = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
    };
    const addFavouriteResponse = await fetch(
      "http://localhost:5000/movie/favourite",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );
  };
  
  const checkFavorite = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
    };
    const checkFavoriteResponse = await fetch(
      "http://localhost:5000/movie/favourite/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );
    const result = await checkFavoriteResponse.json();
    return result.favorited;
  };
  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movie/detail/${movieID}`);
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetails();
    const fetchTrailerID = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/trailer/${movieID}`,{
          method: "GET",
          headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setTrailerVideoId(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrailerID();
  }, [movieID]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=37be93e690e7adb076e5110e93fda06f`);
      setRecommendations(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [movieID]);
  
  useEffect(() => {
    const fetchFavourite = async () => {
      const response = await checkFavorite(user._id, movieID);
      setIsFavourited(response);
    };
    fetchFavourite();
  }, [movieID, user._id]);

  const handleFavouriteClick = () => {
    // Call the favourite function with the necessary values here
    favourite(user._id, movieID);
    setIsFavourited(!isFavourited);
  };

  if (!movie) {
    return <Typography>Loading...</Typography>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <FlexBetween>
      <Box>
        <Image width = "300px" height="500px" src={imageUrl} alt={`${movie.title} poster`} />
        <Typography>Title: {movie.title}</Typography>
        <Typography>Overview: {movie.overview}</Typography>
        <Typography>Adult: {movie.adult.toString()}</Typography>
        <Typography>Release Date: {movie.release_date}</Typography>
        <Typography>Id: {movie.id}</Typography>
        <Typography>Original Title: {movie.original_title}</Typography>
        <Typography>Original Language: {movie.original_language}</Typography>
        <Typography>Popularity: {movie.popularity}</Typography>
        <Typography>Vote Count: {movie.vote_count}</Typography>
        <Typography>Vote Average: {movie.vote_average}</Typography>
        <Button variant='contained'>Rent</Button>

        {recommendations && (
          <>
            <Typography>Recommendations:</Typography>
            {recommendations.map((recommendation) => (
              <Link to={`/movie/${recommendation.id}`}>
                <Box
                  key={recommendation.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image 
                    width="150px" 
                    height="250px" 
                    src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}` : "https://via.placeholder.com/150x250.png?text=No+Image"} 
                    alt={`${recommendation.title} poster`} 
                  />
                </Box>
              </Link>
            ))}
          </>
        )}


      </Box>
      <Box>
        <IconButton onClick={handleFavouriteClick}>
          {!isFavourited ? (
            <FavoriteBorderOutlinedIcon
              sx={{fontSize:"40px"}}/>
          ) : (
            <FavoriteOutlinedIcon 
            sx={{fontSize:"40px"}}/>
          )}
        </IconButton>
      </Box>
      <YouTubePlayer videoId={trailerVideoId}/>
      <Link to={`/home`}>
            <button>Home</button>
      </Link>
  </FlexBetween>
  );
};

export default MoviePage;


/* API DOCUMENTATION
For Movie:
  <Typography>Title: {movie.title}</Typography>
  <Typography>Overview: {movie.overview}</Typography>
  <Typography>Adult: {movie.adult.toString()}</Typography>
  <Typography>Release Date: {movie.release_date}</Typography>
  <Typography>Id: {movie.id}</Typography>
  <Typography>Original Title: {movie.original_title}</Typography>
  <Typography>Original Language: {movie.original_language}</Typography>
  <Typography>Popularity: {movie.popularity}</Typography>
  <Typography>Vote Count: {movie.vote_count}</Typography>
  <Typography>Vote Average: {movie.vote_average}</Typography>


For Recomendation is the same as movie.
Example {recommedation.title}
*/
