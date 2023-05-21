import { Box, Typography, Button } from "@mui/material";
import { React, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "mui-image";
import { ArrowBackIos, ArrowForwardIos, KeyboardDoubleArrowDown, Campaign } from "@mui/icons-material";
import { Link } from "react-scroll";
import CarouselVideo from "../trailerPlayer/carouselVideo"

export default function Carousel({ movie }) {
  const [currImg, setCurrImg] = useState(0);
  // const [movie, setMovie] = useState(null);
  const [youtubeIDs, setVideoIDS] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);


  const { movieID } = useParams();

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  // //FETCH MOVIE DETAIL
  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/movie/detail/${movieID}`
  //       );
  //       const data = await response.json();
  //       setMovie(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchMovieDetails();
  // }, [movieID]);

  // //FETCH VIDEO ID
  // useEffect(() => {
  //   const fetchVideoIDs = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/movie/trailer/${movieID}`,
  //         {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       const data = await response.json();
  //       setVideoIDS(data.results);
  //       setSelectedVideo(data.results[0].key)
  //       console.log("snfoauidyluavegui;hiojpok[pgojhiodfsjokp[l[")
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchVideoIDs();
  // }, [movieID]);
  // console.log(selectedVideo)

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
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: 'black'
        }}
      >
        <Box
          className="imgWrapper"
          sx={{
            flex: "40%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Link to="scrollTo" spy={true} smooth={true} offset={-80} duration={500}>
            <Box
              sx={{
                zIndex: '10',
                position: "absolute",
                padding: "0.5rem",
                margin: "3rem 1rem",
                gap: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.8,
                background: "linear-gradient(to left, black, grey)",
                // border: "2px solid black",
                borderLeft: "0",
                // borderRadius: "15px",
                transform: 'rotate(-90deg)'
              }}
            >
              <Campaign
                sx={{
                  color: "white",
                }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Latest Movie
              </Typography>
            </Box>
            <Image
              style={{ zIndex: '3' }}
              position='absolute'
              display="block"
              fit="contain"
              src={imageUrl}
            />
            <Box
              className="discoverMore"
              sx={{
                zIndex: '5',
                position: "absolute",
                inset: 0,
                padding: "2rem",
                fontSize: "large",
                background: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
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
          </Link>
        </Box>
        {/* replace this img with ONLY the most popular MOVIE atm */}
        <Box sx={{
          height: "100%",
          flex: "70%",
          display: "flex",
          backgroundImage: `url(${backdropUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
          <Box
            className="left"
            onClick={() => {
              currImg > 0 && setCurrImg(currImg - 1);
            }}
            sx={{
              flex: "15%",
              height: "100%",
              backgroundColor: 'black',
              display: "grid",
              placeItems: "center",
              opacity: 0.8,
            }}
          >
            {/* <ArrowBackIos /> */}
          </Box>
          <Box
            className="center"
            sx={{
              // backgroundImage: `url(${backdropUrl})`,
              height: "100%",
              width: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.96
              // background: 'linear-gradient(to top, black, white)'
            }}
          >
            {/* <Typography> {movie.id} </Typography> */}
            <CarouselVideo discovery={movie} />
            {/* <img width='100%' src={images[currImg].img} /> */}
            {/* replace this with PICTURES ARRAY the most POPULAR film */}
          </Box>
          <Box
            className="right"
            onClick={() => {
              currImg < images.length - 1 && setCurrImg(currImg + 1);
            }}
            sx={{
              flex: "15%",
              height: "100%",
              backgroundColor: 'black',
              display: "grid",
              placeItems: "center",
              opacity: 0.8,
            }}
          >
            {/* <ArrowForwardIos /> */}
          </Box>
        </Box>
      </Box>
      <Box
        id="scrollTo"
        sx={{
          position: 'relative',
          backgroundColor: 'black',
          width: '100vw',
          height: '1px'
        }}></Box>
    </Box>
  );
}
