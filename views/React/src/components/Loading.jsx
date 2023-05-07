import { CircularProgress, Box } from "@mui/material";
import logo from "../assets/images/Logo.png";

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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
