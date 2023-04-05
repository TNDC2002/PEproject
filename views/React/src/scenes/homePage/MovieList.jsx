import { useState, useEffect } from "react";
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
          try {
            const response = await fetch(`http://localhost:5000/movie/list?category=${CATEGORY_API_ENDPOINTS[category]}`);
            const data = await response.json();
            setMovies(data.results);
          } catch (error) {
            console.error(error);
          }
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
