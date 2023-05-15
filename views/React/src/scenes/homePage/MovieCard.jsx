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
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigate = useNavigate();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const handleMouseEnter = () => {
    const hoveredMovieId = movie.id;
    setHoveredMovieId(hoveredMovieId);
    window.hoveredMovieId = hoveredMovieId;
    console.log(`Hovering at ${hoveredMovieId}`);
  };
  
  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    window.hoveredMovieId = null;
  };

  return (
    <Box 
      backgroundColor={neutralLight}
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "&:hover":{
          cursor: "pointer",
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.8)",
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
