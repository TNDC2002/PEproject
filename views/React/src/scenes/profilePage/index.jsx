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
                <Stack direction="column" spacing={2}
                    
                    minHeight="70vh"
                    
                    sx={{
                        backgroundColor: "yellow"
                        
                    }}
                >
                    <Box
                        minHeight="10vh"
                        minWidth= "10vh"
                        sx={{
                            
                            backgroundColor: "black"
                        }}
                    >
                    </Box>
                    <Stack direction= "row" spacing ={30}
                    minHeight={30}
                    minWidth={30}>
                        
                        
                        <Box
                        minHeight="10vh"
                        minWidth= "10vh"
                        sx={{
                            
                            backgroundColor: "red"
                        }}
                    >
                    </Box>

                    <Box
                        minHeight="10vh"
                        minWidth= "10vh"
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
