import { useState, useEffect } from "react";
import {
  useTheme,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/index.jsx";
import Loading from "../../components/Loading";
import { useNavigate, Link } from "react-router-dom";
import Image from "mui-image";
import FlexBetween from "../../components/FlexBetween.jsx";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Spinner from "../../components/ScreenSpinner"
import ReactPlayer from 'react-player/youtube';

const SearchPage = () => {
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchSearchResult = async (value) => {
      try {
        const fetchSearchResultResponse = await fetch(
          `${VITE_BASE_URL}/search/?query=${value}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await fetchSearchResultResponse.json();
        const results = data.results
          .filter(
            (movie) => movie.media_type === "tv" || movie.media_type === "movie"
          )
          .map((movie) => ({
            title: movie.original_name
              ? movie.original_name
              : movie.original_title,
            id: movie.id,
            poster_path: movie.poster_path,
            media_type: movie.media_type,
            overview: movie.overview,
            genre_ids: movie.genre_ids,
            popularity: movie.popularity,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          }));
        setResult(results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSearchResult(query);
  }, [query, page]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((nextPage) => nextPage + 1);
  };

  if (!result) {
    return <Loading />;
  }

  if (result.length === 0) {
    return (
      <div>
        <Navbar></Navbar>
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
        <Box sx={{ justifyContent: "center", width: "100%" }}>
          <Spinner>
            <Typography>N</Typography>
            <Typography>O</Typography>
            <Typography>M</Typography>
            <Typography>O</Typography>
            <Typography>R</Typography>
            <Typography sx={{ padding: '0 4.5rem 0 0' }}>E</Typography>
            <Typography>R</Typography>
            <Typography>E</Typography>
            <Typography>S</Typography>
            <Typography>U</Typography>
            <Typography>L</Typography>
            <Typography>T</Typography>
            <iframe width="400" height="400" src="https://www.youtube.com/embed/6Cr_8tvvQ0k?autoplay=1&loop=1&controls=0&playlist=6Cr_8tvvQ0k" title="YouTube video player" frameborder="0" allow="accelerometer; loop; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Spinner>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
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
      <Box sx={{
        margin: '2rem',
      }}>
        {result.map((movie) => (
          <Grid container sx={{ my: 2 }}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Box className="posterContainer"
                  sx={{
                    backgroundColor: '#4B4B4B',
                    // borderRadius: "10px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    "&:hover": {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Image
                    width="95%"
                    height="95%"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/1000x1500.png?text=No Image Found"
                    }
                    alt={`${movie.title} poster`}
                    onClick={() => {
                      if (movie.media_type === "movie") {
                        navigate(`/movie/${movie.id}`);
                      } else {
                        navigate(`/TV Shows/${show.id}`);
                      }
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={9} lg={9} paddingLeft={0}>
              <Box className="infoOverlay"
                onClick={() => {
                  if (movie.media_type === "movie") {
                    navigate(`/movie/${movie.id}`);
                  } else {
                    navigate(`/TV Shows/${show.id}`);
                  }
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  paddingLeft: '20px',
                  "&:hover": {
                    cursor: 'pointer',
                    backgroundColor: '#323232'
                  }
                }}>
                <Typography
                  onClick={() => {
                    if (movie.media_type === "movie") {
                      navigate(`/movie/${movie.id}`);
                    } else {
                      navigate(`/TV Shows/${show.id}`);
                    }
                  }}
                  sx={{
                    fontSize: 40,
                    fontWeight: "medium",
                    "&:hover": {
                      textDecoration: 'underline',
                    }
                  }}>
                  {movie.title}
                </Typography>
                <Box
                  onClick={() => {
                    if (movie.media_type === "movie") {
                      navigate(`/movie/${movie.id}`);
                    } else {
                      navigate(`/TV Shows/${show.id}`);
                    }
                  }}>
                  <Typography variant="h5" sx={{ my: 0.5, "&:hover": { textDecoration: 'underline' } }}>
                    <strong>Overview:</strong> {movie.overview}
                  </Typography>

                  <Typography variant="h5" sx={{ my: 0.5, "&:hover": { textDecoration: 'underline' } }}>
                    <strong>Popularity:</strong> {movie.popularity}
                  </Typography>

                  <Typography variant="h5" sx={{ my: 0.5, "&:hover": { textDecoration: 'underline' } }}>
                    <strong>Release Date:</strong> {movie.release_date}
                  </Typography>

                  <Typography variant="h5" sx={{ my: 0.5, "&:hover": { textDecoration: 'underline' } }}>
                    <strong>Vote Average:</strong> {movie.vote_average}
                  </Typography>

                  <Typography variant="h5" sx={{ my: 0.5, "&:hover": { textDecoration: 'underline' } }}>
                    <strong>Vote Count:</strong> {movie.vote_count}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
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
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=yOElNzJxtgw`}
        controls={true}
        playing={true}
        loop={true}
        volume={0.1}
        width='0'
        height='0'
      />
    </div>
  );
};

export default SearchPage;
