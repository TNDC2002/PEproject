import {
    Box,
    Button,
    TextField,
    Container,
    useMediaQuery,
    Typography,
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
                <Box
                    display="flex"
                    minHeight="70vh"
                    sx={{
                        flexDirection: "column",
                        backgroundColor: "yellow"
                    }}
                >

                    <Box
                        minHeight="10vh"
                        sx={{
                            flexDirection: "row",
                            backgroundColor: "black"
                        }}
                    >
                    </Box>

                    <Box
                        minHeight="60vh"
                        sx={{
                            flexDirection: "column",
                            backgroundColor: "red"
                        }}
                    >
                        <Box
                            minHeight="20vh"
                            sx={{
                                backgroundColor: "blue"
                            }}
                        >

                        </Box>
                        <Box
                            minHeight="20vh"
                            sx={{
                                backgroundColor: "green"
                            }}
                        >

                        </Box>
                    </Box>

                </Box>
            </Container >
        </Box >
    );
};

export default ProfilePage;
