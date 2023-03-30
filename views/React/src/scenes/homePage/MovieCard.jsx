const MovieCard = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
    return (
      <div>
        <img src={imageUrl} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
        <p>Overview: {movie.overview}</p>
        <p>Movie Id: {movie.id}</p>
      </div>
    );
  };
  


  export default MovieCard;
  