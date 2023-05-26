import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useParams } from "react-router";
import ShowDiscoveryCard from "./ShowDiscoveryCard";
import Carousel from "./Carousel";
import Loading from "../../components/Loading";
import React from 'react';

import { styled, keyframes } from '@mui/system';


const shineAnimation = keyframes`
  0% {
    background-position: -250px;
  }
  60% {
    background-position: 250px;
  }
  100% {
    background-position: 250px;
  }
`;

const ShiningText = styled(Typography)`
  
  margin: "1rem 1.15rem",
  fontWeight: "bold",
  padding: 12px 48px;
  color: #fff;
  background: linear-gradient(to right, #FF5F9E 0, #fff 10%, #FF5F9E 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shineAnimation} 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
`;



const HomeList = () => {
  const [discovery, setDiscovery] = useState(null);
  const [showDiscovery, setShowDiscovery] = useState(null);
  const [page, setPage] = useState(1);
  const [showPage, setShowPage] = useState(1);
  const [animeDiscovery, setAnimeDiscovery] = useState(1);
  const [animePage, setAnimePage] = useState(1);

  useEffect(() => {
    const fetchDiscovery = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/discovery/${page}`
        );
        const data = await response.json();
        setDiscovery(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDiscovery();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((nextPage) => nextPage + 1);
  };

  useEffect(() => {
    const fetchShowDiscovery = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/showDiscovery/${showPage}`
        );
        const data = await response.json();
        setShowDiscovery(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShowDiscovery();
  }, [showPage]);

  useEffect(() => {
    const fetchAnimeDiscovery = async () => {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/movie/animeDiscovery/${animePage}`
        );
        const data = await response.json();
        setAnimeDiscovery(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnimeDiscovery();
  }, [animePage])

  const handleShowPrevPage = () => {
    setShowPage((prevPage) => prevPage - 1);
  };

  const handleShowNextPage = () => {
    setShowPage((nextPage) => nextPage + 1);
  };

  const handleAnimePrevPage = () => {
    setAnimePage((prevPage) => prevPage - 1);
  };

  const handleAnimeNextPage = () => {
    setAnimePage((nextPage) => nextPage + 1);
  };

  if (discovery === null) {
    return <Loading />
  }



  return (
    
      <Box >
      <Carousel movie={discovery[Math.floor(Math.random() * discovery.length)]} />
      <Box >
        <Box>
        <ShiningText fontSize={"20px"} sx={{  margin: "1rem 1.15rem",fontWeight: "bold" }}>
          MOVIES DISCOVERY
    </ShiningText>
          
          <Grid container spacing={2.25} justifyContent="center">
            {discovery?.map?.((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <FlexBetween>
            <IconButton
              onClick={handlePrevPage}
              disabled={page === 1}
              sx={{
                padding: "0 0 0 0.5rem",
              }}
            >
              <ArrowBackIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowBackIos>
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                padding: "0.5rem",
                margin: "1rem 0.5rem",
                border: "hidden",
                borderRadius: "0.5rem ",
              }}
            >
              {page}
            </Typography>
            <IconButton
              onClick={handleNextPage}
              sx={{
                padding: "0 0.5rem 0 0",
              }}
            >
              <ArrowForwardIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowForwardIos>
            </IconButton>
          </FlexBetween>
        </Box>
      </Box>
      <Box>
        <Box>
        <ShiningText fontSize={"20px"} sx={{  margin: "1rem 1.15rem",fontWeight: "bold" }}>
          SHOWS DISCOVERY
    </ShiningText>
          <Grid container spacing={2.25} justifyContent="center">
            {showDiscovery?.map?.((show) => (
              <Grid item key={show.id}>
                <ShowDiscoveryCard show={show} />
              </Grid>
            ))}
          </Grid>
          <FlexBetween>
            <IconButton
              onClick={handleAnimePrevPage}
              disabled={showPage === 1}
              sx={{
                padding: "0 0 0 0.5rem",
              }}
            >
              <ArrowBackIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowBackIos>
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                padding: "0.5rem",
                margin: "1rem 0.5rem",
                border: "hidden",
                borderRadius: "0.5rem ",
              }}
            >
              {showPage}
            </Typography>
            <IconButton
              onClick={handleShowNextPage}
              sx={{
                padding: "0 0.5rem 0 0",
              }}
            >
              <ArrowForwardIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowForwardIos>
            </IconButton>
          </FlexBetween>
        </Box>
      </Box>
      <Box>
        <Box>
        <ShiningText fontSize={"20px"} sx={{  margin: "1rem 1.15rem",fontWeight: "bold" }}>
          ANIME FILM DISCOVERY
    </ShiningText>
          <Grid container spacing={2.25} justifyContent="center">
            {animeDiscovery?.map?.((anime) => (
              <Grid item key={anime.id}>
                <MovieCard movie={anime} />
              </Grid>
            ))}
          </Grid>
          <FlexBetween>
            <IconButton
              onClick={handleAnimePrevPage}
              disabled={animePage === 1}
              sx={{
                padding: "0 0 0 0.5rem",
              }}
            >
              <ArrowBackIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowBackIos>
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                padding: "0.5rem",
                margin: "1rem 0.5rem",
                border: "hidden",
                borderRadius: "0.5rem ",
              }}
            >
              {animePage}
            </Typography>
            <IconButton
              onClick={handleAnimeNextPage}
              sx={{
                padding: "0 0.5rem 0 0",
              }}
            >
              <ArrowForwardIos
                sx={{ fontSize: "30px", color: "white", margin: "0 0.75rem" }}
              ></ArrowForwardIos>
            </IconButton>
          </FlexBetween>
        </Box>
      </Box>
      </Box>
   
  );
};

export default HomeList;
