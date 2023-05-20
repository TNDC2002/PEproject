import React from 'react';
import Navbar from "../navbar";
import { Box, Typography } from "@mui/material"

const AdminPage = () => {
  return (
    <Box sx={{ margin: '1rem'}}>
        <Navbar>
            {/* THESE ARE PLACEHOLDERS FOR INCOMING USER DETAILS */}
            <Typography sx={{
                fontWeight: 'bold',
                color: 'white'
            }}>Available Movies</Typography>
            {/* <Grid container spacing={2}>
                {recommendations.map((recommendation) => (
                    <Grid item key={recommendation.id}>
                    <Link to={`/movie/${recommendation.id}`}>
                        <Box
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        >
                        <Image
                            width="175px"
                            height="275px"
                            src={`https://image.tmdb.org/t/p/w500${movie.id}`}
                        />
                        </Box>
                    </Link>
                    </Grid>
                ))}
            </Grid> */}
            <Typography>Available TV Shows</Typography>
            {/* <Grid container spacing={2}>
                {recommendations.map((recommendation) => (
                  <Grid item key={recommendation.id}>
                    <Link to={`/movie/${recommendation.id}`}>
                      <Box
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Image 
                            width="175px" 
                            height="275px" 
                            src={`https://image.tmdb.org/t/p/w500${show.seasons[show.intendedSeason].poster_path}`}/>
                      </Box>
                    </Link>
                  </Grid>
                ))}
            </Grid> */}
        </Navbar>
    </Box>
  )
}

export default index