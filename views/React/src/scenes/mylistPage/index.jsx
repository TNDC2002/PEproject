import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Image from "mui-image";

const MyListPage = () => {
    const [favouriteMovie, setFavouriteMovie ] = useState([]);
    const [favouriteShow, setFavouriteShow ] = useState([]);
    const [rentedMovie, setRentedMovie ] = useState([]);
    const [rentedShow, setRentedShow ] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserFavouriteMovieShow = async (userID) => {
            const fetchUserFavouriteResponse = await fetch(
                `http://localhost:5000/user/${userID}/favourite`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            )
            
        const result = await fetchUserFavouriteResponse.json();
        // Filter the response based on media_type and update the state variables accordingly
        const favouriteMovies = result.filter(item => item.media_type === "movie");
        const favouriteShows = result.filter(item => item.media_type === "tv");
        
        setFavouriteMovie(favouriteMovies);
        setFavouriteShow(favouriteShows);
        }
        fetchUserFavouriteMovieShow(user._id);
    }, [])
    return (
        <div>
         <Box>
            <strong>Your favourite movies:</strong>
            {favouriteMovie.map((movie) => (
            <div key={movie.id}>
                <span>{movie.title}</span>
                {/* Render additional movie details if needed */}
                <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            </div>
            ))}
        </Box>
        <Box>
            <strong>Your favourite shows:</strong>
            {favouriteShow.map((show) => (
            <div key={show.id}>
                <span>{show.name}</span>
                {/* Render additional show details if needed */}
                <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}/>
            </div>
            ))}
        </Box>
        </div>
    )
}

export default MyListPage;