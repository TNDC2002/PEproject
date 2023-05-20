
{/*    this component has to add random TYPOGRAPHY inside <Spinner></Spinner> to work properly       */}


import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Spinner = styled("Box")({
    height: "85vh",
    width: "100vw",
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "1rem",
    color: "#f5f5f5",
    filter: "drop-shadow(0 0 50px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '1rem',
    "& .MuiTypography-root": {
        fontSize: '30px',
        animation: "bouncy 2.5s ease infinite",
        filter: "drop-shadow(0 0 10px #f5f5f5)",
        marginRight: "0.2em",
        marginLeft: "0.2em",
        "&:nth-child(1)": {
          animationDelay: "0s",
        },
        "&:nth-child(2)": {
          animationDelay: "0.25s",
          padding:"0 5rem 0 0"
        },
        "&:nth-child(3)": {
          animationDelay: "0.5s",
        },
        "&:nth-child(4)": {
          animationDelay: "0.75s",
        },
        "&:nth-child(5)": {
          animationDelay: "1s",
        },
        "&:nth-child(6)": {
          animationDelay: "1.25s",
        },
        "&:nth-child(7)": {
          animationDelay: "1.5s",
        },
        "&:nth-child(8)": {
          animationDelay: "1.75s",
        },
        "&:nth-child(9)": {
          animationDelay: "2s",
        },
        "&:nth-child(10)": {
          animationDelay: "2.25s",
        },
        "&:nth-child(11)": {
          animationDelay: "2.5s",
        },
        "&:nth-child(12)": {
          animationDelay: "2.75s",
        },
        "&:nth-child(13)": {
          animationDelay: "3s",
        },
        "&:nth-child(14)": {
          animationDelay: "3.25s",
        },
      },
    "@keyframes bouncy": {
        "0%, 100%": {
        transform: "translateY(0)",
        },
        "50%": {
        transform: "translateY(-50px)",
        },
    },
});

export default Spinner;
