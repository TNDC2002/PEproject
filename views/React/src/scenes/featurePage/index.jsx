import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import FeatureList from "./FeatureList";
import Carousel from "../homePage/Carousel";

const FeaturePage = () => {
  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      <FeatureList category="popular" />
      <FeatureList category="nowPlaying" />
      <FeatureList category="topRated" />
      <FeatureList category="upcoming" />
    </div>
  );
};

export default FeaturePage;
