import {
    Box,
    Button,
    Container,
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
    const [activeSection, setActiveSection] = useState("Profile");

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

    const handleButtonClick = (sectionName) => {
        setActiveSection(sectionName);
    };

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Container sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Box
                    height="60vh"
                    width="80%"
                    sx={{
                        backgroundColor: "yellow",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "green",
                            height: "60px",
                            width: "100%",
                            display: "inline-flex",
                        }}
                    >
                        <ButtonGroup variant="text" aria-label="text button group" fullWidth>
                            <Button onClick={() => handleButtonClick("Profile")}>Profile</Button>
                            <Button onClick={() => handleButtonClick("Password")}>Password</Button>
                            <Button onClick={() => handleButtonClick("Setting")}>Setting</Button>
                        </ButtonGroup>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: "orange",
                            flexGrow: 10,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {activeSection === "Profile" && <ProfileSection user={user} />}
                        {activeSection === "Password" && <Box sx={{ flex: 1 }}>Password</Box>}
                        {activeSection === "Setting" && <Box sx={{ flex: 1 }}>Setting</Box>}
                    </Box>
                </Box>
            </Container>
        </Box>

    );
};

export default ProfilePage;
