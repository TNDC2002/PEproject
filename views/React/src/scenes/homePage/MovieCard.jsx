import { 
  Box,
  Typography,
  useTheme
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import Image from 'mui-image'
import React, { useState } from "react";

const MovieCard = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;

    return (
      <Box 
<<<<<<< Updated upstream
      backgroundColor={neutralLight}
=======
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
>>>>>>> Stashed changes
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        "&:hover":{
        cursor: "pointer"
        }
      }}
      >
        <Image 
          src={imageUrl}
          width={200 / 1.5}
          height={300 / 1.5}
          alt={`${movie.title} poster`}
        />
      </Box>
    );
  };
  


  export default MovieCard;
  