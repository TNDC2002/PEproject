import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import Image from "mui-image";
import React, { useState } from "react";

const ShowDiscoveryCard = ({ show }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
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
        "&:hover":{
          cursor: "pointer",
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
        }
      }}
    >
      <Image
        src={imageUrl}
        width={200 / 1.5}
        height={300 / 1.5}
        alt={`${show.name} poster`}
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
            onClick={() => navigate(`/TV Shows/${show.id}`)}
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
              }}>{show.name}</Typography>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default ShowDiscoveryCard;
