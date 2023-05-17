import FeatureCard from "./featureCard";
import FlexBetween from "../../components/FlexBetween";
import { Grid, IconButton, Box, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const FeatureList = ({ movies, category, page, setPage }) => {
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          margin: "1rem 1.15rem",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {" "}
        {category.toUpperCase()} MOVIES{" "}
      </Typography>
      <Grid container spacing={2.25} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id}>
            <FeatureCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <FlexBetween>
        <IconButton
          onClick={handlePrevPage}
          disabled={page === 1}
          sx={{
            padding: "0 0 0 1.5rem",
          }}
        >
          <ArrowBackIos fontSize="30px" sx={{ color: "white" }}></ArrowBackIos>
        </IconButton>
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
            backgroundColor: "white",
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
            padding: "0 1.5rem 0 0",
          }}
        >
          <ArrowForwardIos sx={{ color: "white" }}></ArrowForwardIos>
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default FeatureList;
