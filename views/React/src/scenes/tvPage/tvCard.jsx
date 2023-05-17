import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from "mui-image";
import React, { useState } from "react";

const TvCard = ({ show }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
  const navigate = useNavigate();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  return (
    <Box
      backgroundColor={neutralLight}
      onClick={() => navigate(`/TV Shows/${show.id}`)}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Image
        src={imageUrl}
        width={200 / 1.5}
        height={300 / 1.5}
        alt={`${show.title} poster`}
      />
    </Box>
  );
};

export default TvCard;
