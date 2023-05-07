import { 
  Box,
  Typography,
  useTheme
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import Image from 'mui-image'
import React, { useState } from "react";

const TvCard = ({ show }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    return (
      <div>
        <Box
          backgroundColor = {neutralLight}
          onClick={() => navigate(`/tv/${show.id}`)}
          sx={{
              "&:hover":{
              cursor: "pointer"
              }
            }}
        >
          <Image
            src = {imageUrl}
            width = {200 / 1.5}
            height = {300 / 1.5}
            alt = {`${show.title} poster`}
          />
        </Box>
      </div>
    );
  };
  


  export default TvCard;
  