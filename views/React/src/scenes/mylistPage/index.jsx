import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Rating, useTheme } from '@mui/material';
import Image from "mui-image";
import Navbar from "../navbar";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player/youtube';
import Spinner from "../../components/ScreenSpinner"
import Avatar from "@mui/material/Avatar";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

const MyListPage = () => {
    const [favouriteMovie, setFavouriteMovie] = useState([]);
    const [favouriteShow, setFavouriteShow] = useState([]);
    const [rentedMovie, setRentedMovie] = useState([]);
    const [rentedShow, setRentedShow] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const theme = useTheme();

    const [hoveredFavouriteMovieId, setHoveredFavouriteMovieId] = useState(null);
    const [hoveredFavouriteShowId, setHoveredFavouriteShowId] = useState(null);
    const [hoveredRentedMovieId, setHoveredRentedMovieId] = useState(null);
    const [hoveredRentedShowId, setHoveredRentedShowId] = useState(null);

    const [hoveredMediaData, setHoveredMediaData] = useState(null);

    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const fetchUserFavouriteMovieShow = async (userID) => {
            const fetchUserFavouriteResponse = await fetch(
                `${VITE_BASE_URL}/user/${userID}/favourite`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",

                }
            )

            const result = await fetchUserFavouriteResponse.json();
            const updatedResult = await Promise.all(result.map(async (media) => {
                const hoveredMediaInfo = await fetchHoveredMediaUser(user._id, media.id, media.media_type, media.intendedSeason);
                return { ...media, ...hoveredMediaInfo };
            }));
            // Filter the response based on media_type and update the state variables accordingly
            const favouriteMoviesResult = updatedResult.filter(item => item.media_type === "movie");
            const favouriteShowsResult = updatedResult.filter(item => item.media_type === "tv");

            setFavouriteMovie(favouriteMoviesResult);
            setFavouriteShow(favouriteShowsResult);
        }
        fetchUserFavouriteMovieShow(user._id);
    }, [])

    useEffect(() => {
        const fetchUserRentedMovieShow = async (userID) => {
            const fetchUserRentResponse = await fetch(
                `${VITE_BASE_URL}/user/${userID}/rent`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",

                }
            )

            const result = await fetchUserRentResponse.json();
            const updatedResult = await Promise.all(result.map(async (media) => {
                const hoveredMediaInfo = await fetchHoveredMediaUser(user._id, media.id, media.media_type, media.intendedSeason);
                return { ...media, ...hoveredMediaInfo };
              }));
            // Filter the response based on media_type and update the state variables accordingly
            const rentedMoviesResult = updatedResult.filter(item => item.media_type === "movie");
            const rentedShowsResult = updatedResult.filter(item => item.media_type === "tv");

            setRentedMovie(rentedMoviesResult);
            setRentedShow(rentedShowsResult);
        }
        fetchUserRentedMovieShow(user._id);
    }, [])

    useEffect(() => {

    }, [])
    const fetchHoveredMediaUser = async (userID, mediaID, media_type, season) => {
        const requestData = {
            userID: userID,
            movieID: mediaID,
            media_type: media_type,
            season: season,
        };

        const favourite_url = new URL(`${VITE_BASE_URL}/api/favourite/check`);
        favourite_url.search = new URLSearchParams(requestData).toString();

        const rate_url = new URL(`${VITE_BASE_URL}/api/rate/check`);
        rate_url.search = new URLSearchParams(requestData).toString();

        const rent_url = new URL(`${VITE_BASE_URL}/api/rent/check`);
        rent_url.search = new URLSearchParams(requestData).toString();

        const checkFavoriteResponse = await fetch(favourite_url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        });
        const checkFavouriteResult = await checkFavoriteResponse.json();

        const checkRateResponse = await fetch(rate_url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        });
        const checkRateResult = await checkRateResponse.json();

        const checkRentResponse = await fetch(rent_url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        });
        const checkRentResult = await checkRentResponse.json();

        const hoveredMediaInfo = { ...checkFavouriteResult, ...checkRateResult, ...checkRentResult }
        return hoveredMediaInfo;
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
            "&:nth-of-type(1)": {
                animationDelay: "0s",
            },
            "&:nth-of-type(2)": {
                animationDelay: "0.25s",
                padding: "0 5rem 0 0"
            },
            "&:nth-of-type(3)": {
                animationDelay: "0.5s",
            },
            "&:nth-of-type(4)": {
                animationDelay: "0.75s",
            },
            "&:nth-of-type(5)": {
                animationDelay: "1s",
            },
            "&:nth-of-type(6)": {
                animationDelay: "1.25s",
            },
            "&:nth-of-type(7)": {
                animationDelay: "1.5s",
            },
            "&:nth-of-type(8)": {
                animationDelay: "1.75s",
            },
            "&:nth-of-type(9)": {
                animationDelay: "2s",
            },
            "&:nth-of-type(10)": {
                animationDelay: "2.25s",
            },
            "&:nth-of-type(11)": {
                animationDelay: "2.5s",
            },
            "&:nth-of-type(12)": {
                animationDelay: "2.75s",
            },
            "&:nth-of-type(13)": {
                animationDelay: "3s",
            },
            "&:nth-of-type(14)": {
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
            <Navbar currentPage="My List" ></Navbar>
            <Box>
                {favouriteMovie.length === 0 && favouriteShow.length === 0 && rentedMovie.length == 0 && rentedShow.length == 0?
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
                    </Spinner>
                    :
                    <Box
                        sx={{
                            margin: '1.5rem'
                        }}>
                        <Typography sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite movies</Typography>
                        <Box
                            className="moviePoster"
                            sx={{
                                padding: '1rem 0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                            {favouriteMovie.map((movie) => (
                                <Grid title={movie.title} key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Box
                                        onMouseEnter={async () => {
                                            setHoveredFavouriteMovieId(movie.id);
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredFavouriteMovieId(null);
                                        }}
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            "&:hover": {
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                            }
                                        }}>
                                        <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                        {/* <Typography>{movie.title}</Typography> */}
                                        {hoveredFavouriteMovieId === movie.id && (
                                            <Box
                                                onClick={() => navigate(`/movie/${movie.id}`)}
                                                className="hover" sx={{
                                                    display: 'flex',
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
                                                        display: 'grid',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>
                                                    <Typography sx={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',

                                                    }}>{movie.title}</Typography>
                                                    <Avatar>
                                                        {movie ?
                                                            (movie.Favourite_return.favourited ? (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            ) : (
                                                                <FavoriteOutlinedIcon
                                                                    sx={{ fontSize: "23px", color: theme.palette.primary.main }}
                                                                />
                                                            )) : (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            )
                                                        }

                                                    </Avatar>
                                                    <Rating name="read-only"
                                                        value={movie ? movie.Rating_return.RateValue ? movie.Rating_return.RateValue : 0 : 0}
                                                        precision="0.5"
                                                        readOnly
                                                        sx={{ fontSize: "25px" }}>
                                                    </Rating>

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
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your favourite shows</Typography>
                        <Box
                            className="showPoster"
                            sx={{
                                padding: '1rem 0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                            {favouriteShow.map((show) => (
                                <Grid title={show.name} key={`${show.id}-${show.intendedSeason}`} item xs={12} sm={6} md={4} lg={3}>
                                    <Box
                                        onMouseEnter={async () => {
                                            setHoveredFavouriteShowId(`${show.id}-${show.intendedSeason}`);
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredFavouriteShowId(null);
                                        }}
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            "&:hover": {
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                            }
                                        }}>
                                        <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${show.seasons.length > 1 ? show.seasons[show.intendedSeason].poster_path : show.poster_path}`} />
                                        {/* <Typography>{movie.title}</Typography> */}
                                        {hoveredFavouriteShowId === `${show.id}-${show.intendedSeason}` && (
                                            <Box
                                                onClick={() => navigate(`/TV Shows/${show.id}`)}
                                                className="hover" sx={{
                                                    display: 'flex',
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
                                                    <Avatar>
                                                        {show ?
                                                            (show.Favourite_return.favourited ? (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            ) : (
                                                                <FavoriteOutlinedIcon
                                                                    sx={{ fontSize: "23px", color: theme.palette.primary.main }}
                                                                />
                                                            )) : (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            )
                                                        }

                                                    </Avatar>
                                                    <Rating name="read-only"
                                                        value={show ? show.Rating_return.RateValue ? show.Rating_return.RateValue : 0 : 0}
                                                        precision="0.5"
                                                        readOnly
                                                        sx={{ fontSize: "25px" }}
                                                    >
                                                    </Rating>
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
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your rented movies</Typography>
                        <Box
                            className="moviePoster"
                            sx={{
                                padding: '1rem 0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                            {rentedMovie.map((movie) => (
                                <Grid title={movie.title} key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Box
                                        onMouseEnter={async () => {
                                            setHoveredRentedMovieId(movie.id);
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredRentedMovieId(null);
                                        }}
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            "&:hover": {
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                            }
                                        }}>
                                        <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                        {/* <Typography>{movie.title}</Typography> */}
                                        {hoveredRentedMovieId === movie.id && (
                                            <Box
                                                onClick={() => navigate(`/movie/${movie.id}`)}
                                                className="hover" sx={{
                                                    display: 'flex',
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
                                                        display: 'grid',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>
                                                    <Typography sx={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',

                                                    }}>{movie.title}</Typography>
                                                    <Avatar>
                                                        {movie ?
                                                            (movie.Favourite_return.favourited ? (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            ) : (
                                                                <FavoriteOutlinedIcon
                                                                    sx={{ fontSize: "23px", color: theme.palette.primary.main }}
                                                                />
                                                            )) : (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            )
                                                        }

                                                    </Avatar>
                                                    <Rating name="read-only"
                                                        value={movie ? movie.Rating_return.RateValue ? movie.Rating_return.RateValue : 0 : 0}
                                                        precision="0.5"
                                                        readOnly
                                                        sx={{ fontSize: "25px" }}
                                                    >
                                                    </Rating>
                                                    {movie ? (
                                                        movie.Rental_return ? (
                                                            movie.Rental_return.Rented ? (
                                                                movie.Rental_return.Rental_information.rentalExpireDate > new Date().toISOString() ? (
                                                                    <div>
                                                                        <EventAvailableOutlinedIcon sx={{ color: 'green', fontSize: '30px' }}></EventAvailableOutlinedIcon>
                                                                        <Typography> Active till <strong>{movie.Rental_return.Rental_information.rentalExpireDate.substring(0, 10)}</strong> </Typography>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <EventBusyOutlinedIcon sx={{ color: 'red', fontSize: '30px' }}></EventBusyOutlinedIcon>
                                                                        <Typography> Expired since <strong> {movie.Rental_return.Rental_information.rentalExpireDate.substring(0, 10)} </strong> </Typography>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div>no info</div>
                                                            )
                                                        ) : (
                                                            <div>no info</div>
                                                        )
                                                    ) : (
                                                        <div>no info</div>
                                                    )
                                                    }
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
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '2px solid white',
                            paddingBottom: '0.5rem'
                        }}>Your rented shows</Typography>
                        <Box
                            className="moviePoster"
                            sx={{
                                padding: '1rem 0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                            {rentedShow.map((show) => (
                                <Grid title={show.name} key={`${show.id}-${show.intendedSeason}`} item xs={12} sm={6} md={4} lg={3}>
                                    <Box
                                        onMouseEnter={async () => {
                                            setHoveredRentedShowId(`${show.id}-${show.intendedSeason}`);
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredRentedShowId(null);
                                        }}
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            "&:hover": {
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                                            }
                                        }}>
                                        <Image width="175px" height="275px" src={`https://image.tmdb.org/t/p/w500${show.seasons.length > 1 ? show.seasons[show.intendedSeason].poster_path : show.poster_path}`} />
                                        {/* <Typography>{movie.title}</Typography> */}
                                        {hoveredRentedShowId === `${show.id}-${show.intendedSeason}` && (
                                            <Box
                                                onClick={() => navigate(`/TV Shows/${show.id}`)}
                                                className="hover" sx={{
                                                    display: 'flex',
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
                                                        display: 'grid',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>
                                                    <Typography sx={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',

                                                    }}>{show.name}</Typography>
                                                    <Avatar>
                                                        {show ?
                                                            (show.Favourite_return.favourited ? (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            ) : (
                                                                <FavoriteOutlinedIcon
                                                                    sx={{ fontSize: "23px", color: theme.palette.primary.main }}
                                                                />
                                                            )) : (
                                                                <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                                                            )
                                                        }

                                                    </Avatar>
                                                    <Rating name="read-only"
                                                        value={show ? show.Rating_return.RateValue ? show.Rating_return.RateValue : 0 : 0}
                                                        precision="0.5"
                                                        readOnly
                                                        sx={{ fontSize: "25px" }}
                                                    >
                                                    </Rating>
                                                    {show ? (
                                                        show.Rental_return ? (
                                                            show.Rental_return.Rented ? (
                                                                show.Rental_return.Rental_information.rentalExpireDate > new Date().toISOString() ? (
                                                                    <div>
                                                                        <EventAvailableOutlinedIcon sx={{ color: 'green', fontSize: '30px' }}></EventAvailableOutlinedIcon>
                                                                        <Typography> Active till <strong>{show.Rental_return.Rental_information.rentalExpireDate.substring(0, 10)}</strong> </Typography>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <EventBusyOutlinedIcon sx={{ color: 'red', fontSize: '30px' }}></EventBusyOutlinedIcon>
                                                                        <Typography> Expired since <strong> {show.Rental_return.Rental_information.rentalExpireDate.substring(0, 10)} </strong> </Typography>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div>no info</div>
                                                            )
                                                        ) : (
                                                            <div>no info</div>
                                                        )
                                                    ) : (
                                                        <div>no info</div>
                                                    )
                                                    }
                                                    {/*      TIME-RENTED ( CALCULATE TO THE TIME EXPIRED )        */}
                                                    {/* <Typography></Typography> */}
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default MyListPage;