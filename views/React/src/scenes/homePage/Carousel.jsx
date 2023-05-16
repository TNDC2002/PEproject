import { Repeat } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Image from "mui-image";
import {
  ArrowBackIos,
  ArrowForwardIos,
  KeyboardDoubleArrowDown,
  Campaign,
} from "@mui/icons-material";

import { images } from "./CarouselData";

export default function Carousel({ movie }) {
  const [currImg, setCurrImg] = useState(0);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100vw",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        className="carouselInner"
        sx={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          className="imgWrapper"
          sx={{
            width: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              padding: "0.5rem",
              margin: "1rem",
              gap: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "15px",
            }}
          >
            <Campaign
              sx={{
                color: "black",
              }}
            />
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Latest Movie
            </Typography>
          </Box>
          <Image
            display="block"
            fit="cover"
            position="center"
            width="100%"
            height="100%"
            src={imageUrl}
          />
          <Box
            className="discover"
            onClick={() => {
              window.scrollTo(0, 650);
            }}
            sx={{
              position: "absolute",
              inset: 0,
              padding: "2rem",
              fontSize: "large",
              background: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              opacity: 0,
              transition: "200ms ease-in-out",
              "&:hover": {
                opacity: 1,
                cursor: "pointer",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Discover More Movies
            </Typography>
            <KeyboardDoubleArrowDown fontSize="large" />
          </Box>
        </Box>
        {/* replace this img with ONLY the most popular MOVIE atm */}
        <Box
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
          sx={{
            flex: "15%",
            height: "100%",
            background: "linear-gradient(to right, white, black)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            opacity: 0.8,
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <ArrowBackIos />
        </Box>
        <Box
          className="center"
          sx={{
            backgroundImage: `url(${images[currImg].img})`,
            height: "100%",
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            display: "flex",
            // background: 'linear-gradient(to top, black, white)'
          }}
        >
          {/* <img width='100%' src={images[currImg].img} /> */}
          {/* replace this with PICTURES ARRAY the most POPULAR film */}
        </Box>
        <Box
          className="left"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
          sx={{
            flex: "15%",
            height: "100%",
            background: "linear-gradient(to left, white, black)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            opacity: 0.8,
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <ArrowForwardIos />
        </Box>
      </Box>
    </Box>
  );
}
