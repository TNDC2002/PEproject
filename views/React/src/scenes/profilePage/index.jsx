import {
    Box,
    Button,
    Container,
    useMediaQuery,
    ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import ProfileSection from "../../components/ProfileSection";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const userID = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    // const [firstName, setFirstName] = useState(null);
    // const [lastName, setLastName] = useState(null);
    // const [email, setEmail] = useState(null);
    // const [password, setPassword] = useState(null);




    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/profile/${userID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Container>
                <Box
                    minHeight="60vh"
                    width="100%"
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
                            width: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <ProfileSection user={user} />
                    </Box>


                </Box>
            </Container>
        </Box>

    );
};

export default ProfilePage;
