import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import Image from "mui-image";
import Navbar from "../navbar";

const MyListPage = () => {
    const [favouriteMovie, setFavouriteMovie ] = useState([]);
    const [favouriteShow, setFavouriteShow ] = useState([]);
    const [rentedMovie, setRentedMovie ] = useState([]);
    const [rentedShow, setRentedShow ] = useState([]);
    const user = useSelector((state) => state.user);

    const[isHovered, setIsHovered] = useState(false)

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
    console.log(favouriteShow.length)

    const spinner = styled("Box")({
        height: "50px",
        width: "max-content",
        fontSize: "18px",
        fontWeight: 600,
        spacing: "1rem",
        color: "#f5f5f5",
        filter: "drop-shadow(0 0 10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

    return (
        <Box>
            <Navbar></Navbar>
            { favouriteMovie.length === 0 ? 
                <Typography>LIKE SOMETHING BITCH</Typography>
             : 
                <Box sx={{
                    margin: '1.5rem'
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize:'1.5rem',
                            fontWeight:'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite movies</Typography>
                        <Box sx={{ padding:'1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {favouriteMovie.map((movie) => (
                            <Grid title={movie.title} key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                <Box sx={{
                                    display: 'inline-block',
                                    "&:hover":{
                                        cursor: 'pointer',
                                        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                    }
                                }}>
                                    <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                                </Box>
                            </Grid>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontSize:'1.5rem',
                            fontWeight:'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite shows</Typography>
                        <Box sx={{ padding:'1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {favouriteShow.map((show) => (
                            <Grid title={show.name} key={show.id} item lg={3}>
                                <Box sx={{
                                    display: 'inline-block',
                                    "&:hover":{
                                        cursor: 'pointer',
                                        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                    }
                                }}>
                                    <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${show.seasons[show.intendedSeason].poster_path}`}/>
                                </Box>
                            </Grid>
                            ))}
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default MyListPage;