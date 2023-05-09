import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';

const YouTubePlayer = ({ videoId }) => {
  return (
    <Box sx={{ backgroundColor: 'black', padding: '0 0%', display: 'flex', justifyContent: 'center' }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls={true}
        playing={false}
        volume={1.0}
      />
    </Box>
  );
};

export default YouTubePlayer;

