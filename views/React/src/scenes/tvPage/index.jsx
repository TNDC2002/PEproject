import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import TvList from "./tvList";
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";


const TvPage = () => {
    return (
        <div>
            <Navbar/>
            {/* <YouTubePlayer videoId={""}/> */}
            <TvList category="airing_Today" />
            <TvList category="on_The_Air" />
            <TvList category="popular" />
            <TvList category="topRated" />
        </div>
    );
};

export default TvPage;
