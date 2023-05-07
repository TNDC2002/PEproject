import { useState, useEffect } from "react";
import axios from "axios";
import TvCard from "./tvCard";
import FlexBetween from "../../components/FlexBetween";
import { Grid, IconButton, Box, Typography} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CATEGORY_API_ENDPOINTS = {
    airing_Today: "airing_today",
    on_The_Air: "on_the_air",
    popular: "popular",
    topRated: "top_rated",
  };

const TvList = ({ category }) => {
    const [show, setShow] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        const fetchShow = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${CATEGORY_API_ENDPOINTS[category]}?api_key=37be93e690e7adb076e5110e93fda06f&language=en-US&page=${page}`);
            setShow(response.data.results);
            };
        fetchShow();
    }, [category, page]);

    const handlePrevPage = () => {
      setPage((prevPage) => prevPage - 1);
    };
  
    const handleNextPage = () => {
      setPage((prevPage) => prevPage + 1);
    };

    return (
      <Box>
        <Typography variant="h3" sx={{
          margin: '1rem 1.15rem',
          fontWeight: 'bold',
          color: 'white'
        }}> {category.toUpperCase().replace(/_/g," ")} Show </Typography>
        <Grid container spacing={2.25} justifyContent="center">
          {show.map((show) => (
            <Grid item key={show.id}>
              <TvCard show={show} />
            </Grid>
          ))}
        </Grid>
        <FlexBetween>
          <IconButton onClick={handlePrevPage} disabled={page === 1} sx={{
            padding: '0 0 0 0.5rem'
          }}>
            <ArrowBackIos fontSize="30px" sx={{ color: 'white' }}></ArrowBackIos>
          </IconButton>
          <Typography sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: 'white',
            padding: '0.5rem',
            margin: '1rem 0.5rem',
            border: 'hidden',
            borderRadius: '0.5rem '
          }}>{page}</Typography>
          <IconButton onClick={handleNextPage} sx={{
            padding: '0 0.5rem 0 0'
          }}>
            <ArrowForwardIos sx={{ color: 'white' }}></ArrowForwardIos>
          </IconButton>
        </FlexBetween>
      </Box>
    );
};

export default TvList;
