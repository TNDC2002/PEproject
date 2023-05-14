import { useState, useEffect } from "react";
import MovieCard from "./MovieDiscoveryCard";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, KeyboardDoubleArrowDown } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import Navbar from "../navbar";
import HomeList from "../homePage/HomeList";
import Carousel from "./Carousel"


const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Box>
        <Typography>Discover More!</Typography>
        <KeyboardDoubleArrowDown />
      </Box>
      <HomeList />
    </div>
  );
};

export default HomePage;
