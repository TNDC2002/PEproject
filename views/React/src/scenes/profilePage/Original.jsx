import { Box, Button, Container, ButtonGroup, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import ProfileSection from "./ProfileSection";
import Card from "../../assets/image/demo7.png";
import Background from "../../assets/image/demo2-1.png";

const Original = () => {
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState("Profile");

  const handleButtonClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  if (!user) return null;

  return (
    <Box sx={{ backgroundColor: "#060047", height: "100%" }}>
      <Navbar />
      
      <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="85vh"
                sx={{
                  backgroundImage: `url(${Background})`,
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundRepeat:"no-repeat",
              }}
              >
       
          <Box
            height="70vh"
            width="60%"
            sx={{
                backgroundImage: `url(${Card})`,
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundRepeat:"no-repeat",

                
            
  
              
              display: "flex",
              flexDirection: "column",
              m: 2
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                height: "80px",
                width: "100%",
                display: "inline-flex",
              }}
            >
              <ButtonGroup
                variant="text"
                size = "large"
                color="secondary"
                aria-label="text button group"
                fullWidth
                sx={{ m: 0 }}
              >
                <Button onClick={() => handleButtonClick("Profile")}>
                  Profile
                </Button>
                <Button onClick={() => handleButtonClick("Account")}>
                  Account
                </Button>
                <Button onClick={() => handleButtonClick("Settings")}>
                  Settings
                </Button>
              </ButtonGroup>
            </Box>

            <Box
            
              sx={{
                
                flexGrow: 10,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                

              }}
            >
              {activeSection === "Profile" && <ProfileSection user={user} />}
              {activeSection === "Account" && (
                <Box sx={{ flex: 1 }}>Account</Box>
              )}
              {activeSection === "Settings" && (
                <Box sx={{ flex: 1 }}>Settings</Box>
              )}
            </Box>
          </Box>
        
      </Box>
    </Box>
  );
};

export default Original;
