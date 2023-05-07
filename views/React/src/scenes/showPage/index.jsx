import { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Image from 'mui-image';
import { useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
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
  DialogActions
} from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import YouTubePlayer from "../trailerPlayer/YoutubeVideo";
import Navbar from '../navbar';
import { Favorite, FavoriteBorderRounded, FavoriteTwoTone } from '@mui/icons-material';



const ShowPage = () => {
  const [show, setShow] = useState(null);
  const { showID } = useParams();
  

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tv/tvDetail/${showID}`);
        const data = await response.json();
        setShow(data);
      } catch (err) {
        console.log(showID)
        console.error(err);
      }
    };
    fetchShowDetails();
  }, [showID]);

  if (!show) {
    return <Typography>Loading...</Typography>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
  return (
    <div>
      <Navbar></Navbar>   
      <Image
        src = {imageUrl}
        width = {200}
        height={300}
        alt = ""
      />
    </div>
  );
};

export default ShowPage;