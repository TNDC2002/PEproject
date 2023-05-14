import profileCard from "../../assets/image/profileBox7.png";
import accountCard from "../../assets/image/accountBox.png";
import movieCard from "../../assets/image/movieBox.png";
import Background from "../../assets/image/backgroundNavPage3.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  ButtonGroup,
  Stack,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: 250,
  height: 250,
  transition: "all 0.3s ease-in-out",
  cursor: 'pointer',
  "&:hover": {
    top: '100%',
    opacity: 1,
    transition: 'all 0.5s ease-in-out',
    transform: "scale(1.2)",
    zIndex: 1,
  },
});

const DescriptionPanel = styled(Box)({
  position: "absolute",
  top: "100%",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  width: "250px",
  marginTop: "10px",
  
  transition: 'all 0.5s ease-in-out'
  
});
const ProfilePage = () => {
  const [isHoveringAccount, setIsHoveringAccount] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  const handleMouseEnterProfile = () => {
    setIsHoveringProfile(true);
  };

  const handleMouseLeaveProfile = () => {
    setIsHoveringProfile(false);
  };
  const [isHoveringMovie, setIsHoveringMovie] = useState(false);

  const handleMouseEnterAccount = () => {
    setIsHoveringAccount(true);
  };

  const handleMouseLeaveAccount = () => {
    setIsHoveringAccount(false);
  };

  
  

  const handleMouseEnterMovie = () => {
    setIsHoveringMovie(true);
  };

  const handleMouseLeaveMovie = () => {
    setIsHoveringMovie(false);
  };



  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#060047",
        flexDirection: "column",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    
    >
      <Typography
        style={{ color: "#B3005E", marginTop: "50px", marginBottom: "50px" }}
        fontSize={40}
      >
        Yo bruh, what's the move?
      </Typography>

      <Stack
        direction="row"
        spacing={15}
        style={{ marginTop: "60px", opacity: 1 }}
      >
        
        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          onMouseEnter={handleMouseEnterAccount}
          onMouseLeave={handleMouseLeaveAccount}
          sx={{
            backgroundImage: `url(${accountCard})`,

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: 250,
            height: 250,
            
          }}
          
        >
          {isHoveringAccount && (
        <DescriptionPanel>
          <Typography fontWeight="light" style={{ color: "#B3005E" }} fontSize={18}>
            This is a description panel for the Account box.
          </Typography>
        </DescriptionPanel>
      )}
          <Typography
            fontWeight="light"
            style={{ color: "#B3005E", marginTop: "50px" }}
            fontSize={25}
          >
            Account
          </Typography>
         
        </StyledBox>

        

        <Link to="./Original" style={{ color: "transparent" }}>
      <div style={{ position: "relative" }}>
        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          onMouseEnter={handleMouseEnterProfile}
          onMouseLeave={handleMouseLeaveProfile}
          sx={{
            backgroundImage: `url(${profileCard})`,
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 250,
            height: 250,
          }}
        >
          <Typography
            fontWeight="light"
            style={{ color: "#B3005E", marginTop: "50px" }}
            fontSize={25}
          >
            Movie
          </Typography>
        </StyledBox>
        {isHoveringProfile && (
          <DescriptionPanel
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              opacity: 1,
              transition: "opacity 0.3s ease-in-out",
              zIndex: 1, // Add zIndex value here
              
            }}
          >
            
            <Typography
              fontWeight="light"
              style={{ color: "#B3005E" }}
              fontSize={18}
            >
              This is a description panel for the Profile box.
            </Typography>
          </DescriptionPanel>
        )}
      </div>
    </Link>
  

        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          onMouseEnter={handleMouseEnterMovie}
          onMouseLeave={handleMouseLeaveMovie}
          sx={{
            backgroundImage: `url(${movieCard})`,

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: 250,
            height: 250,
            
          }}
          
        >
          {isHoveringMovie && (
        <DescriptionPanel>
          <Typography fontWeight="light" style={{ color: "#B3005E" }} fontSize={18}>
            This is a description panel for the Movie box.
          </Typography>
        </DescriptionPanel>
      )}
          <Typography
            fontWeight="light"
            style={{ color: "#B3005E", marginTop: "50px" }}
            fontSize={25}
          >
            Movie
          </Typography>
         
        </StyledBox>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
