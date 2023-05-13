import Card from "../../assets/image/profileBox5.png";
import Background from "../../assets/image/backgroundNavPage3.png";
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

      <Stack direction="row" spacing={15} style={{ marginTop: "60px", opacity: 0.9, }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundImage: `url(${Card})`,

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: 270,
            height: 270,
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
            backgroundImage: `url(${Card})`,

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: 270,
            height: 270,
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
            backgroundImage: `url(${Card})`,

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: 270,
            height: 270,
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
      </Stack>
    </Box>
  );
};

export default ProfilePage;
