import * as React from "react";
import PaymentCover from "../../assets/image/PaymentCover.png";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { Box } from '@mui/material';
import { Stack } from "@mui/material";
import PurchaseCard from "./PurchaseCard/PurchaseCard";
import PurchaseCard2 from "./PurchaseCard/PurchaseCard2";
import PurchaseCard3 from "./PurchaseCard/PurchaseCard3";
import PurchaseCard4 from "./PurchaseCard/PurchaseCard4";
import PurchaseCard5 from "./PurchaseCard/PurchaseCard5";
import PurchaseCard6 from "./PurchaseCard/PurchaseCard6";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PaymentButton = ({ onClick }) => {
  const Icon = styled(Box)({
    background: "white",
    marginLeft: "1em",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5em",
    width: "2.5em",
    borderRadius: "2em",
    boxShadow: "0.1em 0.1em 0.6em 0.2em #FF5F9E",
    right: "0.3em",
    transition: "all 0.3s",
    id: "Icon",
  });
  return (
    <Button
      sx={{
        background: "#FF5F9E",
        color: "white",
        fontFamily: "inherit",
        padding: "0.35em",
        paddingLeft: "1.2em",
        fontSize: "17px",
        fontWeight: "bold",
        borderRadius: "2em",
        border: "none",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        boxShadow: "inset 0 0 1.6em -0.6em #714da6",
        overflow: "hidden",
        position: "relative",
        height: "3.5rem",
        width: "13rem",
        paddingRight: "3.3em",
        transition: "all 0.3s",
        "&:hover": {},
        "&:active #Icon": {
          transform: "scale(0.95)",
        },
        "&:hover #Icon": {
          width: "calc(100% - 0.6em)",
        },
      }}
      onClick={onClick}
    >
      Payment
      <Icon id="Icon">
        <PaymentOutlinedIcon
          sx={{
            width: "1.1em",
            transition: "transform 0.3s",
            color: "#FF5F9E",
          }}
        />
      </Icon>
    </Button>
  );
};

const CustomBox = styled(Box)({
  width: "600px",
  height: "450px",
  backgroundColor: `whitesmoke`,
  position: "relative",
  display: "flex",
  placeContent: "center",

  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "-300px",
    width: "900px",
    backgroundImage:
      "linear-gradient(325deg, rgba(255,255,255,1) 0%, rgba(233,0,100,1) 50%, rgba(179,0,94,1) 100%)",
    height: "900px",
    animation: "rotBGimg 3s linear infinite",
    transition: "all 0.6s linear",
  },
  "@keyframes rotBGimg": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    backgroundImage: `url(${PaymentCover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    inset: "5px",
    borderRadius: "15px",
  },
});

export default function PaymentDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <PaymentButton onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomBox>
          <Box sx={{ zIndex: "1" }}>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              <Stack
                direction="row"
                justifyContent="center"
                style={{ display: "flex", alignContent: "center" }}
              >
                <Typography
                  style={{
                    color: "#B3005E",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                  }}
                  fontSize={40}
                >
                  Smash
                </Typography>

                <Typography
                  style={{
                    color: "whitesmoke",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                  }}
                  fontSize={40}
                >
                  Bruh
                </Typography>
              </Stack>
              <Stack direction="column" style={{ marginTop: "" }}>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{ marginTop: "15px" }}
                >
                  <PurchaseCard></PurchaseCard>
                  <PurchaseCard2></PurchaseCard2>
                </Stack>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{ marginTop: "30px" }}
                >
                  <PurchaseCard3></PurchaseCard3>
                  <PurchaseCard4></PurchaseCard4>
                </Stack>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{ marginTop: "30px" }}
                >
                  <PurchaseCard5></PurchaseCard5>
                  <PurchaseCard6></PurchaseCard6>
                </Stack>
              </Stack>
            </BootstrapDialogTitle>
            <DialogContent onClose={handleClose}></DialogContent>

            <DialogActions></DialogActions>
          </Box>
        </CustomBox>
      </BootstrapDialog>
    </Box>
  );
}
