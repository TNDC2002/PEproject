import React from 'react';
import Navbar from '../navbar';
import HomeList from '../homePage/HomeList';
import BackgroundAnimation from './BackgroundAnimation';


const HomePage = () => {
  return (
    <div>
      <Navbar currentPage="Home" />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <BackgroundAnimation />
        </div>
        <HomeList />
      </div>
    </div>
  );
};

export default HomePage