import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';

const YouTubePlayer = ({ videoId }) => {
  return (
    <Box sx={{ backgroundColor: 'black', padding: '0 0%' }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={true}
        volume={1.0}
        width="100%"
      />
    </Box>
  );
};

export default YouTubePlayer;
