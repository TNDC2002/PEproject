import { 
  Box,
  Typography,
  useTheme
} from "@mui/material";
import FlexBetween from "../profilePage/FlexBetween";
import { useNavigate } from "react-router-dom";
import Image from 'mui-image'
import React, { useState } from "react";

const MovieCard = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Box 
      height="100%"
      zIndex="10"
      maxWidth="500px"
      minWidth="100px"
      backgroundColor={neutralLight}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        "&:hover":{
        cursor: "pointer"
        }
      }}
      >
        <Image 
          src={imageUrl}
          width={200}
          height={300}
          alt={`${movie.title} poster`}
        
        />
        {
          isHovered && (
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 1.5rem, 2rem)"
                color="primary"
              >
                  {movie.title}
              </Typography>
            </Box>
          )
        }
      </Box>

    );
  };
  


  export default MovieCard;
  