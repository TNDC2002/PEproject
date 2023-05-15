import { Repeat } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Image from 'mui-image';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Fade from '@mui/material';

import { images } from './CarouselData';
import imagee from '../../assets/images/SmashBruh.png';

export default function Carousel() {
  const [currImg, setCurrImg] = useState(2);
  return (
    <Box sx={{ height:"90vh", width:"100vw", backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Box className="carouselInner" sx={{ backgroundColor: 'black', height: '100%', width: '100%', display: 'flex'}}>
      <Box className='imgWrapper' sx={{ width: "50%" }}>
        <img width='100%' height='100%' src={imagee}/>
      </Box>
        {/* replace this img with ONLY the most popular MOVIE atm */}
        <Box className="left" 
        onClick={() => {
          currImg > 0 && setCurrImg(currImg - 1);
        }} 
        sx={{ 
          flex: '15%', 
          height: '100%', 
          background: 'linear-gradient(to right, white, black)',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          opacity: 0.8,
          '&:hover':{
            opacity: 0.9
          }
          }}>
          <ArrowBackIos />
        </Box>
        <Box className="center" sx={{ 
          backgroundImage: `url(${images[currImg].img})`, 
          height: '100%', 
          width: '100%', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'contain', 
          display: 'flex' 
          // background: 'linear-gradient(to top, black, white)'

          // add PICTURES and change onClick of Left and Right buttons

          }}>
            <img width='100%' src={images[currImg].img} />
          {/* replace this with PICTURES ARRAY the most POPULAR film */}

          </Box>
        <Box className="left" 
        onClick={() => {
          currImg < images.length - 1 && setCurrImg(currImg + 1);
        }} 
        sx={{ 
          flex: '15%', 
            height: '100%', 
            background: 'linear-gradient(to left, white, black)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            opacity: 0.8,
            '&:hover':{
              opacity: 0.9,
              
            }
            }}>
          <ArrowForwardIos />
        </Box>
      </Box>
    </Box>
  )
}
