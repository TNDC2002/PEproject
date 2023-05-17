import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Navbar from "../navbar";
import HomeList from "../homePage/HomeList";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HomeList />
    </div>
  );
};

export default HomePage;
