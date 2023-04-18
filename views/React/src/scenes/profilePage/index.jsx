import {
    Box,
    Button,
    TextField,
    Container,
    useMediaQuery,
    Typography,
    Stack,
    ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserImage from "../../components/UserImage";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const userID = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/profile/${userID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    const update = async () => {

    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    const handleFormSubmit = () => {

    }

    const handleEditProfile = () => {

    }

    return (
        <Box>
            <Navbar />
            <Container>
                <Box
                    minHeight="60vh"
                    minWidth="110vh"
                    sx={{
                        backgroundColor: "yellow",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "green",
                            flexGrow: 1,
                            width: "100%",
                            display: "inline-flex",
                        }}
                    >
                        <ButtonGroup variant="text" aria-label="text button group" fullWidth>
                            <Button>Profile</Button>
                            <Button>Password</Button>
                            <Button>Setting</Button>
                        </ButtonGroup>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "blue",
                            flexGrow: 10,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Stack
                            direction={isNonMobileScreens ? "row" : "column"}
                            justifyContent="space-between"
                            alignItems="stretch"
                            sx={{ flex: 1 }}
                        >
                            {/* First Stack */}
                            <Stack
                                direction="column"
                                spacing={2}
                                justifyContent="start"
                                alignItems="center"
                                backgroundColor="red"
                                sx={{
                                    width: isNonMobileScreens ? "30%" : "100%",
                                }}
                            >
                                <UserImage
                                    image={`https://tophinhanhdep.com/wp-content/uploads/2021/10/Rem-Wallpapers.png`}
                                    size="100px"
                                />
                            </Stack>

                            {/* Second Stack */}
                            <Stack
                                direction="column"
                                spacing={1.5}
                                justifyContent="start"
                                alignItems="start"
                                backgroundColor="yellow"
                                color="white"
                                sx={{
                                    paddingTop: "2.5%",
                                    width: isNonMobileScreens ? "70%" : "100%",
                                }}
                            >
                                <Typography variant="h4" gutterBottom bgcolor={"red"} margin="0" fontWeight="bold">
                                    Info
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>

                                <Stack direction="row">
                                    <Stack
                                        sx={{
                                            backgroundColor: "blue",
                                            width: "180px",
                                            height: "45px",
                                            justifyContent: "center",
                                        }}>
                                        <Typography fontWeight="bold">First name</Typography>
                                        <Typography>{user.firstName}</Typography>
                                    </Stack>
                                    <Stack
                                        sx={{
                                            backgroundColor: "green",
                                            width: "180px",
                                            height: "45px",
                                            justifyContent: "center",
                                        }}>
                                        <Typography fontWeight="bold">Last name</Typography>
                                        <Typography>{user.lastName}</Typography>
                                    </Stack>
                                </Stack>

                                <Stack
                                    sx={{
                                        backgroundColor: "blue",
                                        width: "180px",
                                        height: "45px",
                                        justifyContent: "center",
                                    }}>
                                    <Typography fontWeight="bold">Email</Typography>
                                    <Typography>{user.email}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>


                </Box>
            </Container>
        </Box>

    );
};

export default ProfilePage;
