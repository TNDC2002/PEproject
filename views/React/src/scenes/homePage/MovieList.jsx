import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./movie_list.css";
import FlexBetween from "../../components/FlexBetween";

const CATEGORY_API_ENDPOINTS = {
    popular: "popular",
    nowPlaying: "now_playing",
    topRated: "top_rated",
    upcoming: "upcoming",
  };

const MovieList = ({ category }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${CATEGORY_API_ENDPOINTS[category]}?api_key=37be93e690e7adb076e5110e93fda06f&language=en-US`);
            setMovies(response.data.results);
            };
        fetchMovies();
    }, [category]);

    return (
      <div>
        <h2>{category.toUpperCase()} MOVIES</h2>
        <ul className="movie-list">
          {movies.map((movie) => (  
            <li key={movie.id}>
              <FlexBetween>
                <MovieCard movie={movie} />
              </FlexBetween>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default MovieList;
