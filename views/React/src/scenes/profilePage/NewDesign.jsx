import Ava from "../../assets/image/bob.png";
import accountCard from "../../assets/image/accountBox.png";
import movieCard from "../../assets/image/movieBox.png";
import BackgroundImage from "../../assets/image/profileCover2.jpg";
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
  Hidden,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Translate } from "@mui/icons-material";

const Avatar = ({ image, size = "100%" }) => {
  return (
      
          <img 
              style={{ objectFit: "cover", borderRadius: "50%" }}
              width={size}
              height={size}
              src={`${image}`}
          />
      
  )
}

const CoverImage = ({ image }) => {
  return (
    <img
      style={{
        objectFit: 'cover',
        objectPosition: 'center top',
        width: '100%',
        height: '100%',
      }}
      src={`${image}`}
      alt=""
    />
  );
};

const MainProfile = styled(Box)({
  height: "100vh",
  width: "100vw",
  background: "lightgray",
  overflowX: Hidden,
});

const ProfileContainer = styled(Box)({
  height: "100vh",
  width: "90%",
  background: "white",
  marginLeft:"5%",
  marginRight:"5%",
});

const TopPortion = styled(Box)({
 height: "45%",
 width: "100%",
 position: "relative",
});

const Background = styled(Box)({
  height: "80%",
  width: "100%",
  background:"cyan",
  overflow: Hidden,
});

const UserImage = styled(Box)({
  position: "absolute",
  height: "60%",
  width: "15%",
  borderRadius: "50%",
  
  right: "42.5%",
  
  backgroundColor: "red",
  bottom: "-2rem",
  border: "5px solid white",
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
   <MainProfile>

     <ProfileContainer>
        <TopPortion>
           <Background>
            <CoverImage image ={BackgroundImage}>

            </CoverImage>
           </Background>
           <UserImage >
             <Avatar image={Ava}></Avatar>
           </UserImage>
        </TopPortion>
        
     </ProfileContainer>
    
   </MainProfile>
  );
};

export default NewDesign;
