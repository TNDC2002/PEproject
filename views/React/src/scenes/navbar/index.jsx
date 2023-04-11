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
    Link
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import logo from "../../images/SmashBruh.png";
import Image from "mui-image";
import { spacing } from "@mui/system";


const Navbar = ({picturePath}) => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const linkStyle ={
        fontSize: '1rem',
        fontFamily: 'Tahoma',
        fontWeight: 'bold',
        color: 'black',
        '&:hover': {
            opacity: 0.5,
            cursor: "pointer",
          },
    };
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    
    const fullName = `${user.firstName} ${user.lastName}`;
    
    return (
        <FlexBetween padding="0.5rem 3rem" backgroundColor = {alt}>
            <FlexBetween gap="1.75rem">
                <Link href="/home" underline="none">
                    <Box
                    component="img"
                    right="0"
                    bottom="0"
                    height="auto"
                    zIndex="10"
                    maxWidth="7rem"
                    minWidth="5rem"
                    src={ logo } 
                    alt="logo" 
                    max-width="100%"
                    href="/home"
                    sx={{
                        cursor: 'pointer',
                        '&hover':{
                            opacity: 0.5,
                        }
                    }}
                />
                </Link>
                <Box display="flex" gap="1.5rem">
                    <Link href="/home" underline="none" sx={linkStyle}>Home</Link>
                    <Link href="home/movies" underline="none" sx={linkStyle}>Feature Movies</Link>
                    <Link href="home/tv" underline="none" sx={linkStyle}>TV Shows</Link>
                    <Link href="home/mylist" underline="none" sx={linkStyle}>My List</Link>   
                </Box>
            </FlexBetween>

            {/*DESKTOP NAV*/}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem"> 
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="15px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                )}
                    {/* <IconButton onClick={() => dispatch(setMode())}> THIS IS "DARK MODE" BUTTON (IMPLEMENT LATER)
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px"}}/>
                        ) : (
                            <LightMode sx={{ color:dark, fontSize: "25px"}}/>
                        )}
                    </IconButton> */}
                    <Notifications sx={{ fontSize: "25px"}}/>
                    <Help sx={{ fontSize: "25px"}}/>
                    <FormControl variant="standard" value = {fullName}>
                        <Select 
                        value = {fullName}
                        sx = {{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "1rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr:"0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu/>
                </IconButton>
            )}
            
            {/* MOBILE NAV */}
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
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/* MENU ITEMS */}
                    <FlexBetween display="flex"
                    flexDirection="column" 
                    justifyContent="center" 
                    gap="3rem"
                    > 
                    {/* <IconButton onClick={() => dispatch(setMode())}> THIS IS "DARK MODE" BUTTON (IMPLEMENT LATER)
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px"}}/>
                        ) : (
                            <LightMode sx={{ color:dark, fontSize: "25px"}}/>
                        )}
                    </IconButton> */}
                    <Notifications sx={{ fontSize: "25px"}}/>
                    <Help sx={{ fontSize: "25px"}}/>
                    <FormControl variant="standard" value = {fullName}>
                        <Select 
                        value = {fullName}
                        sx = {{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "1rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr:"0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;