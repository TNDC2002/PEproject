import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Rating } from "@mui/material";
import Image from "mui-image";
import Navbar from "../navbar";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player/youtube';
import Spinner from "../../components/ScreenSpinner"


const MyListPage = () => {
    const [favouriteMovie, setFavouriteMovie ] = useState([]);
    const [favouriteShow, setFavouriteShow ] = useState([]);
    const [rentedMovie, setRentedMovie ] = useState([]);
    const [rentedShow, setRentedShow ] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [hoveredShowId, setHoveredShowId] = useState(null);
    const [hoveredMediaData, setHoveredMediaData] = useState(null);

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

    const fetchHoveredMediaUser = async (userID, mediaID, media_type, season) => {
        const requestData = {
            userID: userID,
            movieID: mediaID,
            media_type: media_type,
            season: season,
            };
        
        const favourite_url = new URL("http://localhost:5000/api/favourite/check");
        favourite_url.search = new URLSearchParams(requestData).toString();

        const rate_url = new URL("http://localhost:5000/api/rate/check");
        rate_url.search = new URLSearchParams(requestData).toString();

        const rent_url = new URL("http://localhost:5000/api/rent/check");
        rent_url.search = new URLSearchParams(requestData).toString();

        const checkFavoriteResponse = await fetch(favourite_url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
        });
        const checkFavouriteResult = await checkFavoriteResponse.json();

        const checkRateResponse = await fetch(rate_url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
        });
        const checkRateResult = await checkRateResponse.json();

        const checkRentResponse = await fetch(rent_url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const checkRentResult = await checkRentResponse.json();

        const hoveredMovieInfo = {...checkFavouriteResult, ...checkRateResult, ...checkRentResult}
        setHoveredMediaData(hoveredMovieInfo);
    }

    const Spinner = styled("Box")({
        height: "85vh",
        width: "100vw",
        fontSize: "18px",
        fontWeight: 600,
        letterSpacing: "1rem",
        color: "#f5f5f5",
        filter: "drop-shadow(0 0 50px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: '1rem',
        "& .MuiTypography-root": {
            fontSize: '30px',
            animation: "bouncy 2.5s ease infinite",
            filter: "drop-shadow(0 0 10px #f5f5f5)",
            marginRight: "0.2em",
            marginLeft: "0.2em",
            "&:nth-child(1)": {
              animationDelay: "0s",
            },
            "&:nth-child(2)": {
              animationDelay: "0.25s",
              padding:"0 5rem 0 0"
            },
            "&:nth-child(3)": {
              animationDelay: "0.5s",
            },
            "&:nth-child(4)": {
              animationDelay: "0.75s",
            },
            "&:nth-child(5)": {
              animationDelay: "1s",
            },
            "&:nth-child(6)": {
              animationDelay: "1.25s",
            },
            "&:nth-child(7)": {
              animationDelay: "1.5s",
            },
            "&:nth-child(8)": {
              animationDelay: "1.75s",
            },
            "&:nth-child(9)": {
              animationDelay: "2s",
            },
            "&:nth-child(10)": {
              animationDelay: "2.25s",
            },
            "&:nth-child(11)": {
              animationDelay: "2.5s",
            },
            "&:nth-child(12)": {
              animationDelay: "2.75s",
            },
            "&:nth-child(13)": {
              animationDelay: "3s",
            },
            "&:nth-child(14)": {
              animationDelay: "3.25s",
            },
          },
        "@keyframes bouncy": {
            "0%, 100%": {
            transform: "translateY(0)",
            },
            "50%": {
            transform: "translateY(-50px)",
            },
        },
    });
    
    return (
        <Box>
            <Navbar></Navbar>
            <Box>
                { favouriteMovie.length === 0 && favouriteShow.length === 0 ? 
                    <Spinner>
                        <Typography>N</Typography>
                        <Typography>O</Typography>
                        <Typography>I</Typography>
                        <Typography>N</Typography>
                        <Typography>F</Typography>
                        <Typography>O</Typography>
                        <Typography>R</Typography>
                        <Typography>M</Typography>
                        <Typography>A</Typography>
                        <Typography>T</Typography>
                        <Typography>I</Typography>
                        <Typography>O</Typography>
                        <Typography>N</Typography>
                        {/* <ReactPlayer
                            url={`https://www.youtube.com/watch?v=6Cr_8tvvQ0k`}
                            controls={false}
                            playing={true}
                            loop={true}
                            volume={1}
                            width="500px"
                            height="500px"
                        /> */}
                    </Spinner>
                : 
                    <Box
                    sx={{
                        margin: '1.5rem'
                    }}>
                        <Typography sx={{
                            fontSize:'1.5rem',
                            fontWeight:'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite movies</Typography>
                        <Box 
                        className="moviePoster" 
                        sx={{ 
                            padding:'1rem 0', 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '1rem'
                        }}>
                            {favouriteMovie.map((movie) => (
                            <Grid title={movie.title} key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                <Box
                                onMouseEnter={() => {setHoveredMovieId(movie.id);
                                                    fetchHoveredMediaUser(user._id, movie.id, "movie", 0)}}
                                onMouseLeave={() => setHoveredMovieId(null)}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    "&:hover":{
                                        cursor: 'pointer',
                                        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                    }
                                }}>
                                    <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                                    {/* <Typography>{movie.title}</Typography> */}
                                    {hoveredMovieId === movie.id && (
                                        <Box 
                                        onClick={() => navigate(`/movie/${movie.id}`)}
                                        className="hover" sx={{
                                            display:'flex',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0.8,
                                            backgroundColor: 'black',
                                        }}>
                                            <Box
                                            className="infoContainer" sx={{
                                                opacity: 1,
                                                width: '100%',
                                                height: '100%',
                                                display:'grid',
                                                alignItems: 'center',
                                                justifyContent: 'center'

                                            }}>
                                                <Typography sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    
                                                }}>{movie.title}</Typography>
                                                <Rating name="read-only" value={movie.vote_average /2} precision="0.5" readOnly></Rating> 
                                                <Typography>IMDB: {movie.vote_average} / 10</Typography>
                                                
                                                {/*      TIME-RENTED ( CALCULATE TO THE TIME EXPIRED )        */}
                                                {/* <Typography></Typography> */}      
                                            </Box>
                                            
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                            ))}
                        </Box>
                        <Typography sx={{
                            fontSize:'1.5rem',
                            fontWeight:'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite shows</Typography>
                        <Box 
                        className="showPoster" 
                        sx={{ 
                            padding:'1rem 0', 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '1rem' 
                        }}>
                            {favouriteShow.map((show) => (
                            <Grid title={show.name} key={show.id} item xs={12} sm={6} md={4} lg={3}>
                                <Box
                                onMouseEnter={() => {setHoveredShowId(show.id);
                                                    fetchHoveredMediaUser(user._id, show.id, "tv", show.intendedSeason)}}
                                onMouseLeave={() => setHoveredShowId(null)}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    "&:hover":{
                                        cursor: 'pointer',
                                        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                    }
                                }}>
                                    <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${show.seasons[show.intendedSeason].poster_path}`}/>
                                    {/* <Typography>{movie.title}</Typography> */}
                                    {hoveredShowId === show.id && (
                                        <Box 
                                        onClick={() => navigate(`/TV Shows/${show.id}`)}
                                        className="hover" sx={{
                                            display:'flex',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0.8
                                        }}>
                                            <Box className="infoContainer" sx={{
                                                backgroundColor: 'black',
                                                opacity: 1,
                                                width: '100%',
                                                height: '100%',
                                                display: 'grid',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                            }}>
                                                <Typography sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    
                                                }}>{show.name}</Typography>
                                                <Rating name="read-only" value={show.vote_average /2} precision="0.5" readOnly></Rating> 
                                                <Typography>IMDB: {show.vote_average} / 10</Typography>
                                                
                                                {/*      TIME-RENTED ( CALCULATE TO THE TIME EXPIRED )        */}
                                                {/* <Typography></Typography> */}
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                            ))}
                        </Box>
                        {/* <Typography sx={{
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
                        </Box> */}
                    </Box>
                }
            </Box>
            {/* <ReactPlayer
                url={`https://www.youtube.com/watch?v=QZTDZFtbrec`}
                controls={true}
                playing={true}
                loop={true}
                volume={0.1}
                width='0'
                height='0'
            /> */}
        </Box>
    )
}

export default MyListPage;