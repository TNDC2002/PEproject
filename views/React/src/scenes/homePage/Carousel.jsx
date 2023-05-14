import { Repeat } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Image from 'mui-image';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { images } from './CarouselData';

export default function Carousel() {
  const [currImg, setCurrImg] = useState(2);
  return (
    <Box sx={{ height:"80vh", width:"100vw", backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Box className="carouselInner" sx={{ height: '100%', width: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex'}}>
          <img width='25%' src={images[currImg].img} />

          {/* replace this img with ONLY the most popular MOVIE atm */}

          <Box className="left" 
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }} 
          sx={{ 
            flex: '15%', 
            height: '100%', 
            background: 'linear-gradient(to right, black, white)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            }}>
            <ArrowBackIos />
          </Box>
        <Box className="center" sx={{ 
          flex: '100%', 
          height: '100%', 
          // background: 'linear-gradient(to top, black, white)'

          // add PICTURES and change onClick of Left and Right buttons

          }}></Box>
        <Box className="left" 
        onClick={() => {
          currImg < images.length - 1 && setCurrImg(currImg + 1);
        }} 
        sx={{ 
          flex: '15%', 
          height: '100%', 
          background: 'linear-gradient(to left, black, white)',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer'
          }}>
          <ArrowForwardIos />
        </Box>
      </Box>
    </Box>
  )
}
