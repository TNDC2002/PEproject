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
const NewDesign = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
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
     
    </Box>
  );
};

export default NewDesign;
