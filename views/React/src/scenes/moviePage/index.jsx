import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Image from "mui-image";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Loading from "../../components/Loading";
import {
  Box,
  Grid,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Container,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";
import Navbar from "../navbar";
import {
  Favorite,
  FavoriteBorderRounded,
  FavoriteTwoTone,
} from "@mui/icons-material";
import { setMode } from "../../states";

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [youtubeIDs, setVideoIDS] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);


  const dispatch = useDispatch();
  const { movieID } = useParams();
  const user = useSelector((state) => state.user);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const favourite = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
    };
    const addFavouriteResponse = await fetch(
      "http://localhost:5000/movie/favourite",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
  };

  const rent = async (userID, movieID) => {
    const rentalBeginDate = new Date();
    const rentalExpireDate = new Date(rentalBeginDate);
    rentalExpireDate.setDate(rentalExpireDate.getDate() + 7);

    const requestData = {
      userID: userID,
      movieID: movieID,
      rentalBeginDate: rentalBeginDate,
      rentalExpireDate: rentalExpireDate,
    };

    const addRentResponse = await fetch("http://localhost:5000/movie/rent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const checkFavorite = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
    };
    const checkFavoriteResponse = await fetch(
      "http://localhost:5000/movie/favourite/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );
    const result = await checkFavoriteResponse.json();
    return result.favorited;
  };

  const checkRented = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
    };
    const checkRentedResponse = await fetch(
      "http://localhost:5000/movie/rent/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );
    const result = await checkRentedResponse.json();
    return result.rented;
  };

  //FETCH MOVIE DETAIL
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/detail/${movieID}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetails();
  }, [movieID]);

  //FETCH VIDEO ID
  useEffect(() => {
    const fetchVideoIDs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/trailer/${movieID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setVideoIDS(data.results);
        setSelectedVideo(data.results[0].key)
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoIDs();
  }, [movieID]);

  console.log(selectedVideo)

  //FETCH RECOMMENDATIONS
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/recommendations/${movieID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setRecommendations(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendations();
  }, [movieID]);

  useEffect(() => {
    const fetchFavourite = async () => {
      const checkFavouriteResponse = await checkFavorite(user._id, movieID);
      const checkRentedResponse = await checkRented(user._id, movieID);
      setIsRented(checkRentedResponse);
      setIsFavourited(checkFavouriteResponse);
    };
    fetchFavourite();
  }, [movieID, user._id]);

  const handleFavouriteClick = () => {
    // Call the favourite function with the necessary values here
    favourite(user._id, movieID);
    setIsFavourited(!isFavourited);
  };

  const handleRentClick = () => {
    // Call the favourite function with the necessary values here
    rent(user._id, movieID);
    setIsRented(!isRented);
  };

  if (!movie) {
    return <Loading />;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div>
      <Navbar></Navbar>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            Home
          </Link>

          <Link underline="hover" color="inherit">
            Movies
          </Link>
          <Typography color="text.primary">{movie.title}</Typography>
        </Breadcrumbs>

        {youtubeIDs && youtubeIDs.length > 0 && (
          <>
            {/* Main video player */}
            <YouTubePlayer videoId={selectedVideo} width={800} height={600} thumbnail={false} />

            {/* Trailer text */}
            <Box>
              <Typography>
                Other Trailer
              </Typography>
            </Box>

            {/* List of videos */}
            <Box sx={{ overflowX: "hidden" }}>
              <Box sx={{ display: "flex", flexDirection: "row", overflowY: "hidden" }}>
                {youtubeIDs.map((video) => (
                  <Grid item key={video.key} onClick={() => setSelectedVideo(video.key)}>
                    <img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} alt="Thumbnail" width={356} height={220} />
                    {/* <YouTubePlayer videoId={video.key} width={356} height={200} thumbnail={true}/> */}
                  </Grid>
                ))}
              </Box>
            </Box>
          </>
        )}


        <Grid container spacing={3} sx={{ my: 2 }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <Box
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                }}
              >
                <Image
                  sx={{ borderRadius: "10px" }}
                  src={imageUrl}
                  alt={`${movie.title} poster`}
                />
              </Box>
              <IconButton
                onClick={handleFavouriteClick}
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(50%, 50%)",
                }}
              >
                {!isFavourited ? (
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: "40px" }} />
                ) : (
                  <FavoriteOutlinedIcon
                    sx={{ fontSize: "40px", color: theme.palette.primary.main }}
                  />
                )}
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={9} lg={9}>
            <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
              {movie.title}
            </Typography>

            <Button variant="contained" sx={{ mx: 0.5, my: 1 }}>
              <VideocamIcon></VideocamIcon> <strong>Trailer </strong>
            </Button>

            <Button variant="contained" sx={{ mx: 0.5 }}>
              <strong>IMDB:</strong> {movie.vote_average}
            </Button>

            <Typography variant="body1" sx={{ my: 0.5 }}>
              <strong>Overview:</strong> {movie.overview}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Release Date:</strong> {movie.release_date}
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Production:</strong>{" "}
                  {movie.production_companies.map((g) => g.name).join(", ")}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Duration:</strong> {movie.runtime} min
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Country:</strong>{" "}
                  {movie.production_countries.map((g) => g.name).join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Genre:</strong>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </Typography>
              </Grid>
            </Grid>

            {/* <IconButton onClick={handleFavouriteClick} sx={{ my: 2 }}>
            {!isFavourited ? (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "40px" }} />
            ) : (
              <FavoriteOutlinedIcon sx={{ fontSize: "40px" }} />
            )}
          </IconButton> */}

            <Button
              variant="contained"
              onClick={handleRentClick}
              disabled={isRented}
            >
              {!isRented ? (
                <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
              ) : (
                <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
              )}

              {!isRented ? (
                <strong>Rent</strong>
              ) : (
                <strong>Already Rented</strong>
              )}
            </Button>
          </Grid>
        </Grid>
        <Box sx={{}}>
          {recommendations && (
            <Box>
              <Typography variant="h5" sx={{ pb: 1 }}>
                <strong>You may also like:</strong>
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map((recommendation) => (
                  <Grid item key={recommendation.id}>
                    <Link to={`/movie/${recommendation.id}`}>
                      <Box
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Image
                          width="175px"
                          height="275px"
                          src={
                            recommendation.poster_path
                              ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}`
                              : "https://via.placeholder.com/150x250.png?text=No+Image"
                          }
                          alt={`${recommendation.title} poster`}
                        />
                      </Box>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <Box
        sx={{
          height: 70,
        }}
      ></Box>
    </div>
  );
};

export default MoviePage;

/* API DOCUMENTATION
For Movie:
  <Typography>Title: {movie.title}</Typography>
  <Typography>Overview: {movie.overview}</Typography>
  <Typography>Adult: {movie.adult.toString()}</Typography>
  <Typography>Release Date: {movie.release_date}</Typography>
  <Typography>Id: {movie.id}</Typography>
  <Typography>Original Title: {movie.original_title}</Typography>
  <Typography>Original Language: {movie.original_language}</Typography>
  <Typography>Popularity: {movie.popularity}</Typography>
  <Typography>Vote Count: {movie.vote_count}</Typography>
  <Typography>Vote Average: {movie.vote_average}</Typography>


For Recomendation is the same as movie.
Example {recommedation.title}





*/
