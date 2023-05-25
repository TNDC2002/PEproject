import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Radio } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CottageSharpIcon from '@mui/icons-material/CottageSharp';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import TheaterComedySharpIcon from '@mui/icons-material/TheaterComedySharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';

const Container = styled('div')`
  position: flex;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabsContainer = styled('div')`
  display: flex;
  position: relative;
  background-color: #e90064;
  box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
  padding: 0.75rem;
  border-radius: 99px;

  > * {
    z-index: 2;
  }
`;

const TabLabel = styled('label')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 170px;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => (props.active ? 'white' : 'white')};
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.15s ease-in;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
  }

  > a {
    text-decoration: none;
    color: white;
    transition: color 0.15s ease-in;
  }

  &:hover > a {
    color: white;
    transform: scale(1.1);
    transition: 0.3s;
  }

  @media (max-width: 1200px) {
    height: 30px;
    width: 100px;
    font-size: 0.8rem;
  }

  @media (max-width: 1000px) {
    height: 0px;
    width: 0px;
    font-size: 0.9rem;
    opacity: 0;
  }
`;

const Glider = styled('div')`
  position: absolute;
  display: flex;
  height: 35px;
  width: 170px;
  background-color: #060047;
  z-index: 1;
  border-radius: 99px;
  transition: transform 0.25s ease-out;
  transform: translateX(${(props) => props.translateX}%);

  @media (max-width: 1200px) {
    height: 30px;
    width: 100px;
  }
  @media (max-width: 1000px) {
    height: 0px;
    width: 0px;
    font-size: 0.9rem;
    opacity: 0;
  }
`;

const IconListComponent = ({ currentPage }) => {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    const activeTabIndex = currentPage ? pages.indexOf(currentPage) : 0;
    setHoveredTab(activeTabIndex);
  }, [currentPage]);

  const handleTabHover = (index) => {
    const tabValue = `radio-${index + 1}`;
    const activeTabValue = location.pathname === '/' ? 'radio-1' : location.pathname.slice(1);

    if (activeTabValue !== tabValue) {
      setHoveredTab(index);
    } else {
      setHoveredTab(null);
    }
  };

  const handleTabLeave = () => {
    setHoveredTab(null);
  };

  const getGliderTranslateX = () => {
    if (hoveredTab !== null) {
      return 100 * hoveredTab;
    }

    const activeTabIndex = currentPage ? pages.indexOf(currentPage) : 0;
    return 100 * activeTabIndex;
  };

  const pages = ['Home', 'Feature Movies', 'TV Shows', 'My List'];
  const icons = [
    <CottageSharpIcon sx={{ marginRight: '10px' }} />,
    <AutoAwesomeSharpIcon sx={{ marginRight: '10px' }} />,
    <TheaterComedySharpIcon sx={{ marginRight: '10px' }} />,
    <FormatListBulletedSharpIcon sx={{ marginRight: '10px' }} />,
  ];

  return (
    <Container>
      <TabsContainer>
        {pages.map((page, index) => (
          <React.Fragment key={`radio-${index + 1}`}>
            <Radio
              id={`radio-${index + 1}`}
              name="tabs"
              checked={location.pathname === `/${page}`}
              value={`/${page}`}
              style={{ display: 'none' }}
            />
            <TabLabel
              className={location.pathname === `/${page}` ? 'active' : ''}
              htmlFor={`radio-${index + 1}`}
              onMouseEnter={() => handleTabHover(index)}
              onMouseLeave={handleTabLeave}
              active={location.pathname === `/${page}`}
            >
              {icons[index]}
              <Link to={`/${page}`} css={{ textDecoration: 'none', color: 'inherit' }}>
                {page}
              </Link>
            </TabLabel>
          </React.Fragment>
        ))}
        <Glider translateX={getGliderTranslateX()} />
      </TabsContainer>
    </Container>
  );
};

export default IconListComponent;
