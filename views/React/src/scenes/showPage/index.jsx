import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Image from "mui-image";
import { useSelector } from "react-redux";
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

const ShowPage = () => {
  const [show, setShow] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const { showID } = useParams();

  const user = useSelector((state) => state.user);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const favourite = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
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

  const rent = async (userID, showID) => {
    const rentalBeginDate = new Date();
    const rentalExpireDate = new Date(rentalBeginDate);
    rentalExpireDate.setDate(rentalExpireDate.getDate() + 7);

    const requestData = {
      userID: userID,
      movieID: showID,
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

  const checkFavorite = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
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

  const checkRented = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
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

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/tvDetail/${showID}`
        );
        const data = await response.json();
        setShow(data);
      } catch (err) {
        console.log(showID);
        console.error(err);
      }
    };
    fetchShowDetails();
  }, [showID]);

  useEffect(() => {
    const fetchShowTrailerIDs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/tvTrailer/${showID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setTrailerVideoId(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShowTrailerIDs();
  }, [showID]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/tvRecommendations/${showID}`,
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
  }, [showID]);

  useEffect(() => {
    const fetchFavourite = async () => {
      const checkFavouriteResponse = await checkFavorite(user._id, showID);
      const checkRentedResponse = await checkRented(user._id, showID);
      setIsRented(checkRentedResponse);
      setIsFavourited(checkFavouriteResponse);
    };
    fetchFavourite();
  }, [showID, user._id]);

  const handleFavouriteClick = () => {
    // Call the favourite function with the necessary values here
    favourite(user._id, showID);
    setIsFavourited(!isFavourited);
  };

  const handleRentClick = () => {
    // Call the favourite function with the necessary values here
    rent(user._id, showID);
    setIsRented(!isRented);
  };

  if (!show) {
    return <Loading />;
  }

  console.log(trailerVideoId);

  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

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
          <Typography color="text.primary">{show.original_name}</Typography>
        </Breadcrumbs>

        {trailerVideoId !== null && trailerVideoId.length > 0 ? (
          <>
            <YouTubePlayer videoId={trailerVideoId[0].key} />

            <Box sx={{ overflowX: "auto" }}>
              {trailerVideoId && (
                <Box>
                  <Typography variant="h5" sx={{ pb: 1 }}>
                    <strong>Trailer:</strong>
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {trailerVideoId.map((video) => (
                      <Grid item key={video.key} spacing={2}>
                        <YouTubePlayer videoId={video.key} />
                      </Grid>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <></>
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
                  alt={`${show.original_name} poster`}
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
              {show.original_name}
            </Typography>

            <Button variant="contained" sx={{ mx: 0.5, my: 1 }}>
              <VideocamIcon></VideocamIcon> <strong>Trailer </strong>
            </Button>

            <Button variant="contained" sx={{ mx: 0.5 }}>
              <strong>IMDB:</strong> {show.vote_average}
            </Button>

            <Typography variant="body1" sx={{ my: 0.5 }}>
              <strong>Overview:</strong> {show.overview}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Release Date:</strong> {show.first_air_date}
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Production:</strong>{" "}
                  {show.production_companies.map((g) => g.name).join(", ")}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Duration:</strong> {show.episode_run_time} min
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Country:</strong>{" "}
                  {show.production_countries.map((g) => g.name).join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Genre:</strong>{" "}
                  {show.genres.map((g) => g.name).join(", ")}
                </Typography>
              </Grid>
            </Grid>

            {/* <IconButton onClick={() => {}} sx={{ my: 2 }}>
            {!isRented ? (
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
                    <Link to={`/TV Shows/${recommendation.id}`}>
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
                          alt={`${recommendation.original_name} poster`}
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

export default ShowPage;

/**
 * []
 */