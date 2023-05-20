import React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';

const CarouselVideo = ({ discovery }) => {
    const [videoKey, setVideoKey] = useState(null);
    //FETCH VIDEO ID
    useEffect(() => {
        const fetchVideoIDs = async () => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${discovery.id}/videos?api_key=37be93e690e7adb076e5110e93fda06f`
          );
          const data = await response.json();
          const video = data.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
          if (video) {
            setVideoKey(video.key);
          }
        };
    
        fetchVideoIDs();
      }, [discovery.id]);
    
  return (
    <Box sx={{ backgroundColor: 'black', padding: '0 0%', display: 'flex', justifyContent: 'center', flex: '100%', height: '100%' }}>
        {videoKey && (
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            volume={1.0}
            width="100%"
            height="100%"
          />
        )}  
    </Box>
  );
};

export default CarouselVideo;

