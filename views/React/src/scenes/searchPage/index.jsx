import { useState, useEffect } from "react";
import { useTheme, Typography, Box, Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/index.jsx";
import Loading from "../../components/Loading";
import { useNavigate, Link } from "react-router-dom";
import Image from "mui-image";
import FlexBetween from "../../components/FlexBetween.jsx";
const SearchPage = () => {
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchSearchResult = async (value) => {
      try {
        const fetchSearchResultResponse = await fetch(
          `http://localhost:5000/search/?query=${value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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
  }, [query]);

  if (!result) {
    return <Loading />;
  }

  if (result.length === 0) {
    return (
      <div>
        <Navbar></Navbar>
        <strong> The thing you looking for does not seem to exist LOL</strong>
      </div>
    );
  }

  console.log(result);
  return (
    <div>
      <Navbar></Navbar>
      <Box sx={{}}>
        {result.map((movie) => (
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
                        navigate(`/TV Shows/${movie.id}`);
                      }
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={9} lg={9}>
              <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
                {movie.title}
              </Typography>

              <Button variant="contained" sx={{ mx: 0.5 }}>
                <strong>IMDB:</strong> {movie.vote_average}
              </Button>

              <Typography variant="body1" sx={{ my: 0.5 }}>
                <strong>Overview:</strong> {movie.overview}
              </Typography>

              <Typography variant="body1" sx={{ my: 0.5 }}>
                <strong>Popularity:</strong> {movie.popularity}
              </Typography>

              <Typography variant="body1" sx={{ my: 0.5 }}>
                <strong>Release Date:</strong> {movie.release_date}
              </Typography>

              <Typography variant="body1" sx={{ my: 0.5 }}>
                <strong>Vote Average:</strong> {movie.vote_average}
              </Typography>

              <Typography variant="body1" sx={{ my: 0.5 }}>
                <strong>Vote Count:</strong> {movie.vote_count}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ my: 0.5 }}>
                    <strong>Release Date:</strong> {movie.release_date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default SearchPage;
