import {
    Box,
    Button,
    TextField,
    Container,
    useMediaQuery,
    Typography,
    Stack,
    ButtonGroup
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
                <Stack
                    direction={isNonMobileScreens ? "row" : "column"}
                    justifyContent="space-between"
                    alignItems="stretch"
                    sx={{ flex: 1 }}
                >
                    <Box
                        minHeight="60vh"
                        minWidth="35vh"
                        sx={{
                            backgroundColor: "red",
                            flexGrow: 1,
                            flexShrink: 1,
                        }}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="h4" gutterBottom>
                                My Profile
                            </Typography>
                            <UserImage
                                image={`${user.picturePath}`}
                                size={isNonMobileScreens ? "large" : "medium"}
                            />
                            <Typography variant="h5" gutterBottom>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {user.email}
                            </Typography>
                        </Stack>
                    </Box>
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
                            }}
                        >
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h5" gutterBottom>
                                    Personal Information
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    First Name: {user.firstName}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Last Name: {user.lastName}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Date of Birth: {user.dateOfBirth}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Gender: {user.gender}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Phone Number: {user.phoneNumber}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Box>

    );
};

export default ProfilePage;
