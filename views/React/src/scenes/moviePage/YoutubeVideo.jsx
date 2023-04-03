import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';

const YouTubePlayer = ({ videoId }) => {
  return (
    <Box>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls={true}
        width="100%"
        height="400px"
      />
    </Box>
  );
};

export default YouTubePlayer;
