import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import MovieList from "./MovieList";

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <MovieList category="popular" />
            <MovieList category="nowPlaying" />
            <MovieList category="topRated" />
            <MovieList category="upcoming" />
        </div>
    );
};

export default HomePage;