import { useEffect, useState, useRef } from "react";
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
  Rating,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  CardHeader,
  CardContent,
  Card
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
  const [credits, setCredits] = useState(null);
  const [rateDefaultValue, setRateDefaultValue] = useState(0);
  const mainPlayerRef = useRef(null);

  const dispatch = useDispatch();
  const { movieID } = useParams();
  const user = useSelector((state) => state.user);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [rentDuration, setRentDuration] = useState(null);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const favourite = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
      media_type: "movie",
      season: 0
    };

    const method = isFavourited ? "DELETE" : "POST";
    const url = isFavourited
      ? "http://localhost:5000/api/favourite/delete" // DELETE endpoint
      : "http://localhost:5000/api/favourite/insert"; // POST endpoint
  
    const addFavouriteResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const rate = async (userID, movieID, rating) =>{
    const requestData = {
      userID: userID,
      movieID: movieID,
      rating: rating,
      media_type: "movie",
      season: 0
    };

    const method = isRated ? "PUT" : "POST";
    const url = isRated
      ? "http://localhost:5000/api/rate/update" // PUT endpoint
      : "http://localhost:5000/api/rate/insert"; // POST endpoint

    const addRatingResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
     } 
    )
  }

  const unrate = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
      media_type: "movie",
      season: 0
    };
    
    const removeRatingResponse = await fetch(
      "http://localhost:5000/api/rate/delete", {
       method: "DELETE",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify(requestData),
      } 
     )
  }

  const rent = async (userID, movieID, duration) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
      media_type: "movie",
      Duration: duration,
      season: 0
    };

    const addRentResponse = await fetch("http://localhost:5000/api/rent/insert", {
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
      media_type: "movie",
      season: 0
    };
  
    const url = new URL("http://localhost:5000/api/favourite/check");
    url.search = new URLSearchParams(requestData).toString();
  
    const checkFavoriteResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  
    const result = await checkFavoriteResponse.json();
    return result.Favourite_return.favorited;
  };

  const checkRated = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
      media_type: "movie",
      season: 0
    };

    const url = new URL("http://localhost:5000/api/rate/check");
    url.search = new URLSearchParams(requestData).toString();

    const checkRatedResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const result = await checkRatedResponse.json();
    return result;
  }


  const checkRented = async (userID, movieID) => {
    const requestData = {
      userID: userID,
      movieID: movieID,
      media_type: "movie",
      season: 0
    };

    const url = new URL("http://localhost:5000/api/rent/check");
    url.search = new URLSearchParams(requestData).toString();

    const checkRentedResponse = await fetch(url,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await checkRentedResponse.json();
    return result;
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
    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/credits/${movieID}`
        );
        const data = await response.json();
        setCredits(data.cast);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCredits();
  }, [movieID]);
  
  useEffect(() => {
    const fetchInformation = async () => {
      const checkFavouriteResponse = await checkFavorite(user._id, movieID);
      setIsFavourited(checkFavouriteResponse);

      const checkRatedResponse = await checkRated(user._id, movieID);      
      setIsRated(checkRatedResponse.Rating_return.Rated);
      setRateDefaultValue(checkRatedResponse.Rating_return.RateValue);
      
      const checkRentedResponse = await checkRented(user._id, movieID);
      setIsRented(checkRentedResponse.Rental_return.Rented);
      console.log(checkRentedResponse);
    };
    fetchInformation();
  }, [user._id, movieID]);

  const handleFavouriteClick = () => {
    // Call the favourite function with the necessary values here
    favourite(user._id, movieID);
    setIsFavourited(!isFavourited);
  };

  const handleRateClick = (rateValue) => {
    if (rateValue === null) {
      unrate(user._id, movieID);
      setIsRated(false);
      setRateDefaultValue(0);
    }
    else {
      rate(user._id, movieID, rateValue);
      setIsRated(true);
      setRateDefaultValue(rateValue);
    }

  }

  const handleRentClick = (event) => {
    // Call the favourite function with the necessary values here
    const buttonValue = event.target.value
    rent(user._id, movieID, buttonValue);
    setIsRented(!isRented);
    setOpen(true);
    handleClose();
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
              window.location.href = "/Home";
            }}
          >
            Home
          </Link>

          <Link 
            underline="hover" 
            color="inherit"
            onClick={() => {
              window.location.href = "/Feature Movies";
            }}  
          >
            Feature Movies
          </Link>
          <Typography color="text.primary">{movie.title}</Typography>
        </Breadcrumbs>

        {youtubeIDs && youtubeIDs.length > 0 && (
          <>
            {/* Main video player */}
            <div ref={mainPlayerRef}>
              <YouTubePlayer videoId={selectedVideo} width={800} height={600} thumbnail={false} />
            </div>
            {/* Trailer text */}
            <Box>
              <Typography>
                Other Trailer
              </Typography>
            </Box>

            {/* List of videos */}
            <Box sx={{ overflowX: "auto" }}>
              <Box sx={{ display: "flex", flexDirection: "row", overflowY: "hidden" }}>
                {youtubeIDs.map((video) => (
                  <Grid item key={video.key} onClick={() => {
                    setSelectedVideo(video.key)
                    mainPlayerRef.current.scrollIntoView({ behavior: "smooth" });
                  }}>
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
                <Typography variant="body1" sx={{ my: 0.5 }}>
                  <strong>Cast:</strong>{" "}
                  {credits?.slice(0, 5)?.map((g) => g.name)?.join(", ")}
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
              onClick={handleOpen}
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
            <Rating 
              name="half-rating" 
              precision={0.5}
              value={rateDefaultValue}
              onChange={(event, rateValue) => handleRateClick(rateValue)}
              sx={{fontSize:"30px"}}
            ></Rating>

            
                

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Pricing Plan</DialogTitle>
                  <DialogContent>
                    <Container maxWidth="lg">
                      <Box py={8} textAlign="center">
                        <Box mb={3}>
                          <Container maxWidth="lg">
                            <Typography variant="h3" component="span">Pricing Plan</Typography>
                          </Container>
                        </Box>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                              <CardHeader title="1-Day Plan" ></CardHeader>
                              <CardContent>
                                <Box px={1}>
                                  <Typography variant="h3" component="h2" gutterBottom={true}>
                                    100 SD
                                    <Typography variant="h6"  component="span">/week</Typography>
                                  </Typography>
                                  <Typography variant="subtitle1" component="p">1080p Quality</Typography>
                                  <Typography variant="subtitle1" component="p">Limited movies & TV shows</Typography>
                                </Box>
                                <Button 
                                variant="contained" 
                                onClick={handleRentClick}
                                value={1}
                                >Smash</Button>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={4}>
                          <Card variant="outlined">
                              <CardHeader title="1-Week Plan"></CardHeader>
                              <CardContent>
                                <Box px={1}>
                                  <Typography variant="h3" component="h2" gutterBottom={true}>
                                    1000 SD
                                    <Typography variant="h6"  component="span">/month</Typography>
                                  </Typography>
                                  <Typography variant="subtitle1" component="p">4k Quality</Typography>
                                  <Typography variant="subtitle1" component="p">Limited movies & TV shows</Typography>

                                </Box>
                                <Button 
                                  variant="contained" 
                                  onClick={handleRentClick}
                                  value={7}
                                  >Smash</Button>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={4}>
                          <Card variant="outlined">
                              <CardHeader title="1-Month Plan"></CardHeader>
                              <CardContent>
                                <Box px={1}>
                                  <Typography variant="h3" component="h2" gutterBottom={true}>
                                    10000 SD
                                    <Typography variant="h6"  component="span">/year</Typography>
                                  </Typography>
                                  <Typography variant="subtitle1" component="p">4k+ Quality</Typography>
                                  <Typography variant="subtitle1" component="p">Unlimited movies & TV shows</Typography>
                                  <Typography variant="subtitle1" component="p">Cancle anytime</Typography>

                                </Box>
                                <Button 
                                  variant="contained" 
                                  onClick={handleRentClick}
                                  value={30}
                                  >Smash</Button>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>


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
