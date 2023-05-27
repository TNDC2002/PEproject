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

  const[isHovered, setIsHovered] = useState(false)

  return (
    <Box 
      backgroundColor={neutralLight}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        position: 'relative',
        boxShadow: '.4rem .4rem black',
        border: ".5vmin solid #05060f",
        transition: 'all 0.5s',
        "&:hover":{
          cursor: "pointer",
          boxShadow: "16px 16px 0 rgba(32,33,37,10)",
          transform: 'translate(-2px, -4px)',
          
        },

        "&:active":{
          cursor: "pointer",
          transform: "translate(-2px, -4px)",
          boxShadow: "4px 4px 0  rgba(32,33,37,.70)",
        }
      }}
    >
      <Image 
        src={imageUrl}
        width={190 / 1.5}
        height={300 / 1.5}
        alt={`${movie.title} poster`}
      />
      {isHovered && (
          <Box className="hover" sx={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.8,
          }}>
            <Box className="infoContainer" 
            onClick={() => navigate(`/movie/${movie.id}`)}
            sx={{
              backgroundColor: 'black',
              opacity: 1,
              width: '100%',
              height: '100%',
              display:'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold'
              }}>{movie.title}</Typography>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default MovieCard;
