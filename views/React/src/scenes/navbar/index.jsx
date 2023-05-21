import { useState } from "react";
import SearchBar2 from "./Searchbar2";
import NavbarCover from "../../assets/image/navbarCover2.png";
import {
    AppBar,
    Box,
    Button,
    Badge,
    Container,
    Divider,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Typography,
    useTheme,
    Tooltip,
    Toolbar,
} from "@mui/material";
import {
    AccountCircle,
    FormatListBulleted,
    Help,
    Home,
    Logout,
    Movie,
    Notifications,
    Settings,
    Tv,
} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import SearchBar from "./SearchBar";
import logo from "../../assets/images/Logo.png";
import textLogo from "../../assets/images/textLogo.png";
import Image from "mui-image";
import { fontSize, spacing } from "@mui/system";
import IconListComponent from "./IconListComponent";



const Navbar = ({ currentPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [notificationNumber, setNotificationNumber] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectAccount = () => {
        navigate("/profile/" + user._id);
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
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/")
    };
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const primaryPink = theme.palette.primary.main;
    const lightPink = theme.palette.primary.light;
    const background = theme.palette.primary.dark;

    const fullName = user ? `${user.firstName} ${user.lastName}` : "undefined";
    const firstName = user ? `${user.firstName}` : "undefined";
    const email = user ? `${user.email}` : "undefined";
    const pages = ['Home', 'Feature Movies', 'TV Shows', 'My List'];
    return (
        <AppBar sx={{
            top: "0",
            zIndex: "100",
            backgroundColor: "#060047",
            backgroundImage: `url(${NavbarCover})`,
            height: "100px",
            width: "1536px",
            backgroundSize: "cover",
            backgroundPosition: "center",

        }} position="sticky">
            <Container maxWidth="xl" sx={{ marginTop: "15px" }} >
                <Toolbar disableGutters>

                    <Box sx={{ marginLeft: "-10px", }}>
                        <IconListComponent currentPage={currentPage} />
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu}>
                            <MenuIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Box sx={{ display: 'flex', padding: '0 1rem', margin: '0 0 0.5rem 0' }}>

                            </Box>
                            {pages.map((page) => (
                                <MenuItem key={`link-${page}`} onClick={handleCloseNavMenu}>
                                    <Link href={`/${page}`} sx={{ textDecoration: 'none', color: 'black', fontSize: '1rem' }}>{page}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                        <Box
                            component="img"
                            right="0"
                            bottom="0"
                            height="4rem"
                            zIndex="10"
                            src={textLogo}
                            alt="textLogo"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                mr: 0,
                                cursor: 'pointer',
                                '&hover': {
                                    opacity: 0.5,
                                }
                            }}
                            onClick={() => {
                                window.location.href = "/Home";
                            }}
                        />
                    </Box>
                    <SearchBar2></SearchBar2>
                    <Box gap="1rem" sx={{ display: "flex", marginLeft: 'auto' }} >
                        <Box sx={{ flexGrow: 0, margin: "0.5rem" }}>
                            <Tooltip title={firstName}>
                                <IconButton onClick={handleClick}>
                                    <Badge
                                        color="error"
                                        badgeContent={notificationNumber}
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        max={99}
                                    >
                                        <AccountCircle style={{ color: '#FF5F9E', backgroundColor: 'white', borderRadius: '50%', fontSize: '3.4rem' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                sx={{
                                    width: 'auto',
                                    mt: '45px'
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Typography
                                    color='black'
                                    variant="h5"
                                    sx={{
                                        padding: "1rem 1rem 0",
                                        textAlign: "center",
                                        fontWeight: 'bold'
                                    }}
                                >{fullName}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        padding: "0.5rem 0",
                                        textAlign: "center",

                                    }}>{email}</Typography>
                                <Box sx={{
                                    display: 'flex'
                                }}>
                                    <Button onClick={redirectAccount}
                                        sx={{
                                            border: "2px solid black",
                                            borderRadius: '10px',
                                            margin: '1rem',
                                            backgroundColor: 'gray',
                                            width: '100%',
                                            '&:hover': {
                                                backgroundColor: 'dimgrey'
                                            }
                                        }}>
                                        <Typography sx={{
                                            color: 'white',
                                            flexGrow: 1,
                                            textTransform: 'none'
                                        }}>Manage your Bruher Account</Typography>
                                    </Button>
                                </Box>
                                <Divider />
                                <MenuItem onClick={redirectSettings}>
                                    <Settings />
                                    <Typography padding="0.25rem 1rem">Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={redirectNotification}>
                                    <Badge badgeContent={notificationNumber} sx={{ color: notificationNumber > 0 ? 'red' : 'black' }}>
                                        <Notifications />
                                    </Badge>
                                    <Typography padding="0.25rem 1rem">Notifications</Typography>
                                </MenuItem>
                                <MenuItem onClick={redirectHelp}>
                                    <Help />
                                    <Typography padding="0.25rem 1rem">Help</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Logout />
                                    <Typography padding="0.25rem 1rem">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
