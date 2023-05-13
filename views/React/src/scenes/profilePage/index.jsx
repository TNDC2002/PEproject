import profileCard from "../../assets/image/profileBox7.png";
import accountCard from "../../assets/image/accountBox.png";
import movieCard from "../../assets/image/movieBox.png";
import Background from "../../assets/image/backgroundNavPage3.png";
import { Link } from 'react-router-dom';
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
import Original from "./Original";
const ProfilePage = () => {
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

      <Stack direction="row" spacing={15} style={{ marginTop: "60px", opacity: 1, }}>
        
      <Link to="./Original">
        <Box
        
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundImage: `url(${accountCard})`,

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
            Account
          </Typography>
          
        </Box>
        </Link>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
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
            Profile
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundImage: `url(${movieCard})`,

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
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
