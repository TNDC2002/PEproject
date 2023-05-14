import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import FeatureList from "./FeatureList";

const FeaturePage = () => {
  return (
    <div>
      <Navbar />
      <FeatureList category="popular" />
      <FeatureList category="nowPlaying" />
      <FeatureList category="topRated" />
      <FeatureList category="upcoming" />
    </div>
  );
};

export default FeaturePage;
