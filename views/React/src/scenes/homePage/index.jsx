import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import Navbar from "../navbar";
import { useParams } from "react-router";
import ShowDiscoveryCard from "./ShowDiscoveryCard";

const HomePage = () => {
  const [discovery, setDiscovery] = useState(null);
  const [showDiscovery, setShowDiscovery] = useState(null);
  const [page, setPage] = useState(1);
  const [showPage, setShowPage] = useState(1);

  useEffect(() => {
    const fetchDiscovery = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movie/discovery/${page}`
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
          `http://localhost:5000/movie/showDiscovery/${showPage}`
        );
        const data = await response.json();
        setShowDiscovery(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShowDiscovery();
  }, [showPage]);

  const handleShowPrevPage = () => {
    setShowPage((prevPage) => prevPage - 1);
  };

  const handleShowNextPage = () => {
    setShowPage((nextPage) => nextPage + 1);
  };

  return (
    <div>
      <Navbar />
      <Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              margin: "1rem 1.15rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Discovery
          </Typography>
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
          <Typography
            variant="h3"
            sx={{
              margin: "1rem 1.15rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Show Discovery
          </Typography>
          <Grid container spacing={2.25} justifyContent="center">
            {showDiscovery?.map?.((show) => (
              <Grid item key={show.id}>
                <ShowDiscoveryCard show={show} />
              </Grid>
            ))}
          </Grid>
          <FlexBetween>
            <IconButton
              onClick={handleShowNextPage}
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
    </div>
  );
};

export default HomePage;
