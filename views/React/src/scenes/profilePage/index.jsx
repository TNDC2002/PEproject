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
    const user = useSelector((state) => state.user);
    const [activeSection, setActiveSection] = useState("Profile");

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
                            <Button onClick={() => handleButtonClick("Account")}>Account</Button>
                            <Button onClick={() => handleButtonClick("Settings")}>Settings</Button>
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
                        {activeSection === "Account" && <Box sx={{ flex: 1 }}>Account</Box>}
                        {activeSection === "Settings" && <Box sx={{ flex: 1 }}>Settings</Box>}
                    </Box>
                </Box>
            </Container>
        </Box>

    );
};

export default ProfilePage;
