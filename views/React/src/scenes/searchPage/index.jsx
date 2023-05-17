import { useState, useEffect } from "react";
import { useTheme, Typography, Box, Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/index.jsx";
import Loading from "../../components/Loading";
import { useNavigate, Link } from "react-router-dom";
import Image from "mui-image";
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
      {/* {result.map((movie) => (
        <div key={movie.id}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x300.png?text=No+Image"
            }
            alt={movie.title}
            onClick={() => {
              if (movie.media_type === "movie") {
                navigate(`/movie/${movie.id}`);
              } else {
                navigate(`/TV Shows/${movie.id}`);
              }
            }}
          />
          <p>{movie.title}</p>
        </div>
      ))} */}

      <Box sx={{}}>
        <Grid container spacing={2}>
          {result.map((movie) => (
            <Grid item key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <Box
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image
                    width="175px"
                    height="275px"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/150x250.png?text=No+Image"
                    }
                    alt={`${movie.title} poster`}
                  />
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default SearchPage;
