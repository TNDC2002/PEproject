import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Icon,
  Link,
  Tooltip,
  Popover,
  Button,
  Menu,
  Divider,
  Badge,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
  AccountCircle,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import logo from "../../images/Logo.png";
import textLogo from "../../images/textLogo.png";
import Image from "mui-image";
import { fontSize, spacing } from "@mui/system";

const Navbar = ({}) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectAccount = () => {
    navigate("/account");
  };
  const redirectSettings = () => {
    navigate("/settings");
  };
  const redirectNotification = () => {
    navigate("/notification");
  };
  const redirectHelp = () => {
    navigate("/help");
  };

  const linkStyle = {
    fontSize: "1.05rem",
    fontWeight: "bold",
    color: "white",
    "&:hover": {
      opacity: 0.5,
      cursor: "pointer",
    },
  };
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryPink = theme.palette.primary.main;
  const lightPink = theme.palette.primary.light;
  const background = theme.palette.primary.dark;

  const fullName = `${user.firstName} ${user.lastName}`;
  const firstName = `${user.firstName}`;
  const email = `${user.email}`;

  return (
    <FlexBetween padding="0.25rem 2rem" backgroundColor="black">
      <FlexBetween gap="2.5rem">
        <Box
          component="img"
          right="0"
          bottom="0"
          height="4.5rem"
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
        <Box display="flex" gap="1.5rem">
          <Link href="/home" underline="none" sx={linkStyle}>
            Home
          </Link>
          <Link href="home/movies" underline="none" sx={linkStyle}>
            Feature Movies
          </Link>
          <Link href="tv" underline="none" sx={linkStyle}>
            TV Shows
          </Link>
          <Link href="home/mylist" underline="none" sx={linkStyle}>
            My List
          </Link>
        </Box>
      </FlexBetween>

      {/*DESKTOP NAV*/}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="15px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
          <Tooltip title={firstName}>
            <IconButton onClick={handleClick}>
              <Badge color="error" badgeContent="">
                <AccountCircle style={{ color: "white", fontSize: "3rem" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="account"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              width: "auto",
            }}
          >
            <Typography
              color="black"
              variant="h5"
              sx={{
                padding: "1rem 1rem 0",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {fullName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                padding: "0.5rem 0",
                textAlign: "center",
              }}
            >
              {email}
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                onClick={redirectAccount}
                sx={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  margin: "1rem",
                  backgroundColor: "gray",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "dimgrey",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    flexGrow: 1,
                    textTransform: "none",
                  }}
                >
                  Manage your SmashBruh Account
                </Typography>
              </Button>
            </Box>
            <Divider />
            <MenuItem onClick={redirectSettings}>
              <Settings />
              <Typography padding="0.25rem 1rem">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={redirectNotification}>
              <Badge badgeContent={4} sx={{ color: "red" }}>
                <Notifications />
              </Badge>
              <Typography padding="0.25rem 1rem">Notifications</Typography>
            </MenuItem>
            <MenuItem onClick={redirectHelp}>
              <Help />
              <Typography padding="0.25rem 1rem">Help</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => dispatch(setLogout())}>
              <Logout />
              <Typography padding="0.25rem 1rem">Logout</Typography>
            </MenuItem>
          </Menu>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/*                                                           MOBILE NAV                                                           */}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="100px"
          backgroundColor={background}
        ></Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
