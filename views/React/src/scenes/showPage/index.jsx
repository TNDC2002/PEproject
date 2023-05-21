import { useEffect, useState, useRef } from "react";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "mui-image";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Loading from "../../components/Loading";
import { updateUser } from "../../states";
import ReactPlayer from 'react-player/youtube';
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
  Menu,
  CardHeader,
  CardContent,
  Card,
  Divider,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import StarIcon from "@mui/icons-material/Star";
import ImageTest from "../../assets/images/background.png";
import HdOutlinedIcon from '@mui/icons-material/HdOutlined';
import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';

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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [credits, setCredits] = useState(null);
  const mainPlayerRef = useRef(null);

  //hover black name poster
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredRecommendationId, setHoveredRecommendationId] = useState(null);

  const { showID } = useParams();
  const user = useSelector((state) => state.user);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [rateDefaultValue, setRateDefaultValue] = useState(0);
  const [rentalInformation, setRentalInformation] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const token = useSelector((state) => state.token);
  const theme = useTheme();

  //function for popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const anchorRef = useRef(null);

  //open and close popover
  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleSeasonChange = (event) => {
    const selectedSeasonValue = event.target.value;
    setSelectedSeason(selectedSeasonValue);
  };
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonOptions, setSeasonOptions] = useState(null);

  //open and close form
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnterRentButton = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveRentButton = () => {
    setIsHovered(false);
  };

  const favourite = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      season: selectedSeason,
    };

    const url = isFavourited
      ? `${VITE_BASE_URL}0/api/favourite/delete` // DELETE endpoint
      : `${VITE_BASE_URL}/api/favourite/insert`; // POST endpoint

    const method = isFavourited ? "DELETE" : "POST";

    const addFavouriteResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const rate = async (userID, showID, rating) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      rating: rating,
      media_type: "tv",
      season: selectedSeason,
    };

    const method = isRated ? "PUT" : "POST";
    const url = isRated
      ? `${VITE_BASE_URL}/api/rate/update` // PUT endpoint
      : `${VITE_BASE_URL}/api/rate/insert`; // POST endpoint

    const addRatingResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const unrate = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      season: selectedSeason,
    };

    const removeRatingResponse = await fetch(
      `${VITE_BASE_URL}/api/rate/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
  };

  const rent = async (userID, showID, duration) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      Duration: duration,
      season: selectedSeason,
    };

    const addRentResponse = await fetch(
      `${VITE_BASE_URL}/api/rent/insert`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: 'include'
      }
    );
  };

  const checkFavorite = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      season: selectedSeason,
    };

    const url = new URL(`${VITE_BASE_URL}/api/favourite/check`);
    url.search = new URLSearchParams(requestData).toString();

    const checkFavoriteResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await checkFavoriteResponse.json();
    return result.Favourite_return.favorited;
  };

  const checkRated = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      season: selectedSeason,
    };

    const url = new URL(`${VITE_BASE_URL}/api/rate/check`);
    url.search = new URLSearchParams(requestData).toString();

    const checkRatedResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await checkRatedResponse.json();
    return result;
  };

  const checkRented = async (userID, showID) => {
    const requestData = {
      userID: userID,
      movieID: showID,
      media_type: "tv",
      season: selectedSeason,
    };
    const url = new URL(`${VITE_BASE_URL}/api/rent/check`);
    url.search = new URLSearchParams(requestData).toString();

    const checkRentedResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await checkRentedResponse.json();
    return result;
  };

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/tvDetail/${showID}`, {

          credentials: 'include'
        }
        );
        const data = await response.json();
        setShow(data);
        if (data.seasons.length === 1) {
          setSeasonOptions([1]);
        } else {
          setSeasonOptions(
            Array.from(
              { length: data.seasons.length - 1 },
              (_, index) => index + 1
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
      setSelectedSeason(1);
    };
    fetchShowDetails();
  }, [showID]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/credits/${showID}`
        );
        const data = await response.json();
        setCredits(data.cast);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCredits();
  }, [showID]);

  useEffect(() => {
    const fetchShowTrailerIDs = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/tvTrailer/${showID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          }
        );
        const data = await response.json();
        setTrailerVideoId(data.results);
        setSelectedVideo(data.results[0].key);
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
          `${VITE_BASE_URL}/movie/tvRecommendations/${showID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          }
        );
        const data = await response.json();
        setRecommendations(data.results);
        console.log(recommendations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendations();
  }, [showID]);

  const fetchInformation = async () => {
    const checkFavouriteResponse = await checkFavorite(user._id, showID);
    setIsFavourited(checkFavouriteResponse);

    const checkRatedResponse = await checkRated(user._id, showID);
    setIsRated(checkRatedResponse.Rating_return.Rated);
    setRateDefaultValue(checkRatedResponse.Rating_return.RateValue);

    const checkRentedResponse = await checkRented(user._id, showID);
    setIsRented(checkRentedResponse.Rental_return.Rented);
    setRentalInformation(checkRentedResponse.Rental_return.Rental_information);
  };

  useEffect(() => {
    fetchInformation();
  }, [showID, user._id]);

  useEffect(() => {
    fetchInformation();
  }, [selectedSeason]);

  const handleFavouriteClick = () => {
    // Call the favourite function with the necessary values here
    favourite(user._id, showID);
    setIsFavourited(!isFavourited);
  };

  const handleTransaction = async (value) => {
    try {
      const requestData = {
        balance: value
      }
      const transactionResponse = await fetch(
        `${VITE_BASE_URL}/profile/${user._id}/purchase`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
          const updatedUser = {
            ...user,
            balance: data.balance,
          };
          dispatch(updateUser({ user: updatedUser }));
        })
        .catch((error) => console.error(error));

    } catch (error) {
      console.error(error);
    }
  }
  const handleRateClick = (rateValue) => {
    if (rateValue === null) {
      unrate(user._id, showID);
      setIsRated(false);
      setRateDefaultValue(0);
      handlePopoverClose();
    } else {
      rate(user._id, showID, rateValue);
      setIsRated(true);
      setRateDefaultValue(rateValue);
      handlePopoverClose();
    }
  };

  const handleRentClick = (event) => {
    rent(user._id, showID, event.duration);
    setIsRented(!isRented);
    handleTransaction(event.price);
    fetchInformation();
    handleClose();
  };

  if (!show && trailerVideoId === null) {
    return <Loading />;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

  return (
    <div>
      <Navbar></Navbar>
      <Container maxWidth="lg">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ margin: "4px", padding: "4px" }}
        >
          <Link
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => {
              window.location.href = "/Home";
            }}
          >
            <Typography sx={{ "&:hover": { textDecoration: 'underline' } }}>
              <h3>Home</h3>
            </Typography>
          </Link>

          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            onClick={() => {
              window.location.href = "/TV Shows";
            }}
          >
            <Typography sx={{ "&:hover": { textDecoration: 'underline' } }}><h3>Shows</h3></Typography>
          </Link>
          <Typography fontWeight="lighter">
            <h3>{show.original_name}</h3>
          </Typography>
        </Breadcrumbs>

        {trailerVideoId !== null && trailerVideoId.length > 0 ? (
          <>
            <div ref={mainPlayerRef}>
              <YouTubePlayer
                videoId={selectedVideo}
                width={800}
                height={600}
                thumbnail={false}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <Grid container spacing={3} sx={{ padding: "20px" }}>
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
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={9} lg={9}>
            <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
              {show.original_name}
            </Typography>
            <HdOutlinedIcon sx={{ fontSize: "35px" }}></HdOutlinedIcon>
            <ClosedCaptionOffIcon sx={{ fontSize: "35px" }}></ClosedCaptionOffIcon>
            <Stack direction="row" spacing={3} padding="4px">
              <Box>
                <FormControl>
                  <InputLabel>Season</InputLabel>
                  <Select
                    label="Season"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                  >
                    {seasonOptions.map((optionValue) => (
                      <MenuItem key={optionValue} value={optionValue}>
                        Season {optionValue}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Avatar sx={{ "&:hover": { cursor: 'pointer' } }} onClick={handleFavouriteClick}>
                {!isFavourited ? (
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: "23px" }} />
                ) : (
                  <FavoriteOutlinedIcon
                    sx={{ fontSize: "23px", color: theme.palette.primary.main }}
                  />
                )}
              </Avatar>

              <Avatar sx={{ "&:hover": { cursor: 'pointer' } }} ref={anchorRef} onClick={handlePopoverOpen}>
                {!isRated ? (
                  <StarIcon sx={{ fontSize: "23px" }} />
                ) : (
                  <StarIcon sx={{ fontSize: "23px", color: "yellow" }} />
                )}
              </Avatar>
            </Stack>

            <Popover
              open={popoverOpen}
              anchorEl={anchorRef.current}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Rating
                name="half-rating"
                precision={0.5}
                value={rateDefaultValue}
                onChange={(event, rateValue) => handleRateClick(rateValue)}
                sx={{ fontSize: "30px" }}
              ></Rating>
            </Popover>

            <Typography padding="4px">
              {seasonOptions[0] === 1 ? (
                <div>
                  <strong>Overview: </strong> {show.overview}
                </div>
              ) : (
                <div>
                  <strong>Overview: </strong>
                  {show.seasons[selectedSeason].overview}
                </div>
              )}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography padding="4px">
                  <strong>Release Date:</strong> {show.first_air_date}
                </Typography>
                <Typography padding="4px">
                  <strong>Directors:</strong>{" "}
                  {show.created_by.map((g) => g.name).join(", ")}
                </Typography>
                <Typography padding="4px">
                  <strong>Production:</strong>{" "}
                  {show.production_companies.map((g) => g.name).join(", ")}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography padding="4px">
                  <strong>Air:</strong> {show.episode_run_time} min
                </Typography>
                <Typography padding="4px">
                  <strong>Genre:</strong>{" "}
                  {show.genres.map((g) => g.name).join(", ")}
                </Typography>
                <Typography padding="4px">
                  <strong>Cast:</strong>{" "}
                  {credits
                    ?.slice(0, 5)
                    ?.map((g) => g.name)
                    ?.join(", ")}
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
              onClick={handleOpen}
              padding="4px"
              onMouseEnter={handleMouseEnterRentButton}
              onMouseLeave={handleMouseLeaveRentButton}
              sx={{ width: "275px" }}
            >
              {!isRented ? (
                <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
              ) : (
                rentalInformation ? (
                  rentalInformation.rentalExpireDate > new Date().toISOString() ? (
                    !isHovered ? (
                      <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                    ) : (
                      <ShoppingCartCheckoutOutlinedIcon></ShoppingCartCheckoutOutlinedIcon>
                    )
                  ) : (
                    !isHovered ? (
                      <ProductionQuantityLimitsOutlinedIcon></ProductionQuantityLimitsOutlinedIcon>
                    ) : (
                      <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
                    )
                  )
                ) : (
                  <div></div>
                )
              )}

              {!isRented ? (
                <strong>First-Time Rent</strong>
              ) : (
                rentalInformation ? (
                  rentalInformation.rentalExpireDate > new Date().toISOString() ? (
                    !isHovered ? (
                      <strong>Already Rented till {rentalInformation.rentalExpireDate.substring(0, 10)}</strong>
                    ) : (
                      <strong>Extend Rental</strong>

                    )
                  ) : (
                    !isHovered ? (
                      <strong>Rental Expired since {rentalInformation.rentalExpireDate.substring(0, 10)}</strong>
                    ) : (
                      <strong>Rent Again</strong>
                    )
                  )
                ) : (
                  <div>No information</div>
                )
              )}
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>

              <DialogContent sx={{ backgroundImage: `url(${ImageTest})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
                <Container sx={{ height: '100%' }} maxWidth="lg">
                  <Box py={6} textAlign="center" display="flex">
                    <Box mb={3}>
                      <Container maxWidth="lg">
                        <Typography variant="h3" component="span">
                          <h2>Pricing Plan</h2>
                        </Typography>
                      </Container>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                          <CardHeader title={<Typography variant="h4" >1-Day Plan</Typography>}></CardHeader>
                          <CardContent>
                            <Box px={1}>
                              <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom={true}
                              >
                                19.99 SmashDong
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              onClick={() => handleRentClick({ duration: 1, price: -19.99 })}
                              disabled={!user.balance > 19.99}
                            >
                              Smash
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                          <CardHeader title={<Typography variant="h4" >1-Week Plan</Typography>}></CardHeader>
                          <CardContent>
                            <Box px={1}>
                              <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom={true}
                              >
                                129.99 SmashDong
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              onClick={() => handleRentClick({ duration: 7, price: -129.99 })}
                              disabled={!user.balance > 129.99}
                            >
                              Smash
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                          <CardHeader title={<Typography variant="h4" >1-Month Plan</Typography>}></CardHeader>
                          <CardContent>
                            <Box px={1}>
                              <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom={true}
                              >
                                499.99 SmashDong
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              onClick={() => handleRentClick({ duration: 30, price: -499.99 })}
                              disabled={!user.balance > 499.99}
                            >
                              Smash
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
                <Box
                  m={1}
                  //margin
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{ position: 'absoulute', }}
                  >
                    Close
                  </Button>
                </Box>

              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>

        {trailerVideoId !== null && trailerVideoId.length > 0 ? (
          <div>
            <Box>
              <Typography>
                <h3>Other Trailer:</h3>
              </Typography>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
              {trailerVideoId && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      overflowY: "hidden",
                    }}
                  >
                    {trailerVideoId.map((video) => (
                      <Grid
                        item
                        key={video.key}
                        onClick={() => {
                          setSelectedVideo(video.key);
                          mainPlayerRef.current.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          alt="Thumbnail"
                          width={356}
                          height={220}
                        />
                      </Grid>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </div>
        ) : (
          <></>
        )}

        <Box sx={{ paddingTop: "20px" }}>
          {recommendations && (
            <Box>
              <Typography sx={{ pb: 1 }}>
                <h2>You may also like:</h2>
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map((recommendation) => (
                  <Grid item key={recommendation.id}>
                    <Box
                      onMouseEnter={() => { setHoveredRecommendationId(recommendation.id) }}
                      onMouseLeave={() => { setHoveredRecommendationId(null) }}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        "&:hover": {
                          cursor: 'pointer',
                          boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
                        }
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
                      {hoveredRecommendationId === recommendation.id && (
                        <Box
                          onClick={() => {
                            navigate(`/TV Shows/${recommendation.id}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
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
                              width: '100%',
                              height: '100%',
                              display: 'grid',
                              alignItems: 'center',
                              justifyContent: 'center'

                            }}>
                            <Typography sx={{
                              fontSize: '1.25rem',
                              fontWeight: 'bold',

                            }}>{recommendation.name}</Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ShowPage;

/**
 * <Box>
              <Typography>
                Other Trailer
              </Typography>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
              {trailerVideoId && (
                <Box>
                  <Box sx={{ display: "flex", flexDirection: "row", overflowY: "hidden" }}>
                    {trailerVideoId.map((video) => (
                      <Grid item key={video.key} onClick={() => {
                        setSelectedVideo(video.key)
                        mainPlayerRef.current.scrollIntoView({ behavior: "smooth" });
                      }}>
                        <img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} alt="Thumbnail" width={356} height={220} />
                      </Grid>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
 */
