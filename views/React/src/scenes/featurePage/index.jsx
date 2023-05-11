import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import FeatureList from "./FeatureList";
import FlowYoutubePlayer from "../trailerPlayer/FlowYoutubeVideo";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <FlowYoutubePlayer videoId={"BpuQeSvf868"} />
      <FeatureList category="popular" />
      <FeatureList category="nowPlaying" />
      <FeatureList category="topRated" />
      <FeatureList category="upcoming" />
    </div>
  );
};

export default HomePage;
