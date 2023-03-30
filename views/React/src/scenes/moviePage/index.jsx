import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=37be93e690e7adb076e5110e93fda06f&language=en-US`);
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
  <div className="movie-details">
    <img src={imageUrl} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <p>Rating: {movie.vote_average}</p>
    <p>Overview: {movie.overview}</p>
    <div className="movie-actions">
      <button className="rent-button">Rent</button>
      <button className="buy-button">Buy</button>
    </div>
  </div>


  );
};

export default MoviePage;
