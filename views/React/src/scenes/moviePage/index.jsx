import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <Image width = "300px" height="500px" src={imageUrl} alt={`${movie.title} post   er`} />
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
  </FlexBetween>


  );
};

export default MoviePage;
