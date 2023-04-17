import {
    Box,
    Button,
    TextField,
    Container,
    useMediaQuery,
    Typography,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserImage from "../../components/UserImage";

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

    return (
        <Box>
            <Navbar />
            <UserImage image={`${user.picturePath}`} />
            <Container>
                <Stack direction="column"

                    minHeight="70vh"

                    sx={{
                        backgroundColor: "yellow"

                    }}
                >
                    <Box
                        minHeight="10vh"
                        minWidth="10vh"
                        sx={{

                            backgroundColor: "black"
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={5}
                        >
                            <Button
                                variant="text"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "50px",
                                    minWidth: "30px",
                                    minHeight: "30px",
                                }}
                                onClick={() => {
                                    setPageType("login");
                                    resetForm();
                                }}
                                sx={{
                                    height: 70,
                                    color: "#B3005E",
                                }}
                            >

                            </Button>

                            <Button
                                variant="text"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "50px",
                                    minWidth: "30px",
                                    minHeight: "30px",
                                }}
                                onClick={() => {
                                }}
                                sx={{
                                    height: 70,
                                    color: "#B3005E",
                                    "&:hover": {
                                        backgroundColor: "whitesmoke",
                                        color: "black",
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#B3005E",

                                        "&:hover": {
                                            textDecoration: "underline black",
                                        },
                                    }}
                                    display="inline"
                                    style={{ color: "#B3005E" }}
                                    fontSize={20}
                                >
                                    Registrate
                                </Typography>
                            </Button>
                            <Button>

                            </Button>
                            <Button>

                            </Button>
                        </Stack>
                    </Box>
                    <Stack direction="row"
                        justifyContent="space-between"
                        display = "flex"
                        height={30}
                        Width={30}>


                        <Box
                            minHeight="60vh"
                            minWidth="35vh"
                            sx={{

                                backgroundColor: "red"
                            }}
                        >
                        </Box>

                        <Box
                            display="flex" 
                            width= {800}
                            height= {428}
                            sx={{

                                backgroundColor: "red"
                            }}
                        >
                        </Box>


                    </Stack>


                </Stack>
            </Container >
        </Box >
    );
};

export default ProfilePage;
