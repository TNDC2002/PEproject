import { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Image from 'mui-image';
import { useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import Loading from '../../components/Loading';
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
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";
import Navbar from '../navbar';
import { Favorite, FavoriteBorderRounded, FavoriteTwoTone } from '@mui/icons-material';


const ShowPage = () => {
  const [show, setShow] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const { showID } = useParams();
  

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movie/tvDetail/${showID}`);
        const data = await response.json();
        setShow(data)
      } catch (err) {
        console.log(showID)
        console.error(err);
      }
    };
    fetchShowDetails();
  }, [showID]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/tvRecommendations/${showID}`,{
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

  console.log(recommendations)

  if (!show) {
    return <Loading />   
  }

  console.log(show)

  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

  return (   
    <div>
      <Navbar></Navbar>
      <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{my:2}}>
        <Link underline="hover" color="inherit" onClick={() =>{window.location.href="/home";}}>
          Home
        </Link>
        
        <Link
          underline="hover"
          color="inherit"
        >
          Movies
        </Link>
        <Typography color="text.primary">{show.original_name}</Typography>
      </Breadcrumbs>
      {/* <YouTubePlayer videoId={trailerVideoId} /> */}
      <Grid container spacing={3} sx={{my:2}}>
        <Grid item xs={12} sm = {6} md = {3} lg = {3}>
          <Box sx={{ position: 'relative', display: 'inline-flex'}}>
            <Box sx={{ borderRadius: "10px", boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.5)' }}>
              <Image sx={{ borderRadius: "10px" }} src={imageUrl} alt={`${show.original_name} poster`} />
            </Box>
            <IconButton onClick={() => {}} variant='contained' sx={{position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)'}}>
              {/* {!isFavourited ? (
                <FavoriteBorderOutlinedIcon sx={{ fontSize: "40px" }} />
              ) : (
                <FavoriteOutlinedIcon sx={{ fontSize: "40px", color: theme.palette.primary.main}} />
              )} */}
            </IconButton>
          </Box>
          
        </Grid>

        <Grid item xs={12} sm = {6} md = {9} lg = {9}>
          <Typography sx={{fontSize: 40, fontWeight: 'medium'}}>{show.original_name}</Typography>

          <Button variant='contained' sx={{mx:0.5, my:1}}>
            <VideocamIcon></VideocamIcon> <strong>Trailer </strong> 
          </Button>

          <Button variant='contained' sx={{mx:0.5}}>
            <strong>IMDB:</strong> { show.vote_average}
          </Button>

          <Typography variant="body1" sx={{my:0.5}}><strong>Overview:</strong> {show.overview}</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{my:0.5}}><strong>Release Date:</strong> {show.first_air_date}</Typography>
              <Typography variant="body1" sx={{my:0.5}}><strong>Production:</strong> {show.production_companies.map(g => g.name).join(', ')}</Typography>  
                
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{my:0.5}}><strong>Duration:</strong> {show.episode_run_time} min</Typography> 
              <Typography variant="body1" sx={{my:0.5}}><strong>Country:</strong> {show.production_countries.map(g => g.name).join(', ')}</Typography>
              <Typography variant="body1" sx={{my:0.5}}><strong>Genre:</strong> {show.genres.map(g => g.name).join(', ')}</Typography>
            </Grid>
          </Grid>



          <IconButton onClick={() => {}} sx={{ my: 2 }}>
            {true ? (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "40px" }} />
            ) : (
              <FavoriteOutlinedIcon sx={{ fontSize: "40px" }} />
            )}
          </IconButton>

          <Button variant='contained' onClick={() => {}} disabled={() => {}}>
            {true ? (
              <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
            ): (
              <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
            )}

            {false ? (
              <strong>Rent</strong>
            ): (
              <strong>Already Rented</strong>
            )}
            
          </Button>
        </Grid>
      </Grid>
      <Box sx={{}}>
        {recommendations && (
          <Box>
          <Typography variant="h5" sx={{pb: 1}}><strong>You may also like:</strong></Typography>
          <Grid container spacing={2} >
            {recommendations.map((recommendation) => (
            <Grid item key={recommendation.id}>
              <Link to={`/tv/${recommendation.id}`}>
                <Box
                  onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image 
                    width="175px" 
                    height="275px" 
                    src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}` : "https://via.placeholder.com/150x250.png?text=No+Image"} 
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
        height: 70
      }}>
    </Box>
    </div>
  );
};

export default ShowPage;