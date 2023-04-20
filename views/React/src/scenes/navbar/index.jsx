import { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Badge,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputBase,
    Icon,
    Link,
    Menu,
    MenuItem,
    Popover,
    Typography,
    useTheme,
    useMediaQuery,
    Select,
    Tooltip,
    Toolbar,
} from "@mui/material";
import {
    AccountCircle,
    Close,
    DarkMode,
    Help,
    Logout,
    LightMode,
    Message,
    Notifications, 
    Search,
    Settings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import logo from "../../images/Logo.png";
import Image from "mui-image";
import { fontSize, spacing } from "@mui/system";
import SearchBar from "./SearchBar";


const Navbar = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [notificationNumber, setNotificationNumber] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
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

    const redirectAccount =()=>{ navigate('/account') };
    const redirectSettings =()=>{ navigate('/settings') };
    const redirectNotification =()=>{ navigate('/notification') };
    const redirectHelp =()=>{ navigate('/help') };

    const linkStyle ={
        
    };
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const primaryPink = theme.palette.primary.main;
    const lightPink = theme.palette.primary.light;
    const background = theme.palette.primary.dark;

    const fullName = `${user.firstName} ${user.lastName}`;
    const firstName =`${user.firstName}`;
    const email = `${user.email}`;

    const pages = ['Home', 'Feature Movies', 'TV Shows', 'My List'];
    
    return (
        <AppBar sx={{ 
            top: "0",
            zIndex: "100",
            backgroundColor: "black" ,
        }} position="sticky">
            <Container sx={{ p: '0', m: '0'}}>
                <Toolbar disableGutters>
                <Box
                    component="img"
                    right="0"
                    bottom="0"
                    height="4.5rem"
                    zIndex="10"
                    src={ logo  } 
                    alt="logo" 
                    sx={{
                        display: { xs: 'none', md: 'flex'},
                        mr: 0,
                        cursor: 'pointer',
                        '&hover':{
                            opacity: 0.5,
                        }
                    }}
                    onClick={() =>{
                        window.location.href="/home";
                    }}
                />
                <Box gap="1.5rem" sx={{
                    mr: 2,
                    display: { xs:'none', md: 'flex'},
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                }}>
                    <Link href="/home" underline="none" sx={{ 
                        color: 'white',
                        '&:hover': {
                            opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}>Home</Link>
                    <Link href="home/movies" underline="none" sx={{
                        color: 'white',
                        '&:hover': {
                            opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}>Feature Movies</Link>
                    <Link href="home/tv" underline="none" sx={{
                        color: 'white',
                        '&:hover': {
                            opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}>TV Shows</Link>
                    <Link href="home/mylist" underline="none" sx={{
                        color: 'white',
                        '&:hover': {
                            opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}>My List</Link>   
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
                    <IconButton sx={{ color: 'white' }}/>
                </Box>
                </Box>
                    <FlexBetween gap="2rem"> 
                        <FlexBetween backgroundColor={ neutralLight } borderRadius="15px" gap="3rem" padding="0.1rem 1.5rem">
                            <SearchBar></SearchBar>
                        </FlexBetween>
                        <Tooltip title={ firstName }>
                            <IconButton onClick={ handleClick }>
                                <Badge 
                                    color="error" 
                                    badgeContent={ notificationNumber } 
                                    overlap="circular" 
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    max={99}
                                > 
                                <AccountCircle style={{ color: 'white', fontSize: '3rem'}}/>
                                </Badge>    
                            </IconButton>
                        </Tooltip>
                        <Menu 
                            id="account"
                            anchorEl={anchorEl}
                            open={open} 
                            onClose={handleClose}   
                            sx={{
                                width: 'auto',
                            }}
                        >
                            <Typography 
                            color= 'black'
                            variant="h5"
                            sx = {{
                                padding: "1rem 1rem 0",
                                textAlign: "center",
                                fontWeight: 'bold'
                            }}
                            >{ fullName }
                            </Typography>
                            <Typography 
                            variant= "h6"
                            sx={{
                                padding: "0.5rem 0",
                                textAlign:"center",
                                
                            }}>{ email }</Typography>
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
                                }}>Manage your SmashBruh Account</Typography>
                            </Button>
                            </Box>
                            <Divider />
                            <MenuItem onClick={redirectSettings}>
                                    <Settings/>
                                <Typography padding="0.25rem 1rem">Settings</Typography>
                            </MenuItem>
                            <MenuItem onClick={redirectNotification}>
                                <Badge badgeContent={notificationNumber} sx ={{ color: notificationNumber > 0 ? 'red' : 'black'}}>
                                    <Notifications/>
                                </Badge>
                                <Typography padding="0.25rem 1rem">Notifications</Typography>
                            </MenuItem>
                            <MenuItem onClick={redirectHelp}>
                                <Help/>
                                <Typography padding="0.25rem 1rem">Help</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={()=> dispatch(setLogout())}>
                                <Logout/>
                                <Typography padding="0.25rem 1rem">Logout</Typography>
                            </MenuItem>
                        </Menu> 
                    </FlexBetween>  
                </Toolbar>  
            </Container>                                                                                   
        </AppBar>
    );
};

export default Navbar;