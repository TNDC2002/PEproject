import { CircularProgress, Box } from "@mui/material";
import logo from "../images/Logo.png";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={200} thickness={5} color="primary" />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
<<<<<<< Updated upstream
          <Box
            component="img"
            right="0"
            bottom="0"
            height="7rem"
            zIndex="10"
            src={logo}
            alt="logo"
            sx={{
              cursor: "pointer",
              "&hover": {
                opacity: 0.5,
              },
            }}
            onClick={() => {
              window.location.href = "/home";
            }}
=======
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px" }}
            onClick={() =>{window.location.href="/home";}}
>>>>>>> Stashed changes
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
