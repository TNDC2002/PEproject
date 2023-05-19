import Ava from "../../assets/image/bob.png";
import SmashDong from "../../assets/image/SmashDong.png"
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import BotBackgroundImage from "../../assets/image/profileCoverBot6.png";
import ProfileBehind from "../../assets/image/ProfileBehind.png";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useState } from "react";
import StarAnimation from "./StarAnimation";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { updateUser } from "../../states";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
const editSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup
    .string()
    .email("invalid email")
    .required("required"),
});
import {
  Box,
  Button,
  TextField,
  Stack,
  Paper,
  Grid,
  IconButton,
  Typography,
  Hidden,
  Card,
  useMediaQuery,
  Container,
  createTheme,
  ThemeProvider,
  Input,
} from "@mui/material";
import { styled } from "@mui/material/styles";


const Avatar = ({ image, size = "100%" }) => {
  return (
    <img
      style={{ objectFit: "cover", borderRadius: "50%" }}
      width={size}
      height={size}
      src={`${image}`}
    />
  );
};

const MainProfile = styled(Box)({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${ProfileBehind})`,
  backgroundColor: "black",
  overflowX: "Hidden",
});

const ProfileContainer = styled(Box)({
  height: "100vh",
  width: "90%",

  marginLeft: "5%",
  marginRight: "5%",
});

const TopPortion = styled(Box)({
  height: "25%",
  width: "100%",
  position: "relative",
});

const Background = styled(Box)({
  height: "80%",
  width: "100%",
  background: "#B3005E",
  overflow: Hidden,
});

const UserImage = styled(Box)({
  position: "absolute",
  height: "200px",
  width: "200px",
  borderRadius: "50%",
 
  backgroundColor: "red",

  border: "7px solid white",
});

const CustomCard = styled(Card)({
  width: "350px",
  height: "370px",
  transition: "all 0.2s",
  position: "relative",
  cursor: "pointer",
  background: "rgba(255,255,255,.05)",
  boxShadow: "0 0 10px #FF5F9E",
  backdropFilter: "blur(10px)",
  borderRadius: "10%",
  border: "10px solid white",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    transform: "translate(-2px, -4px)",
    boxShadow: "32px 33px 37px #FF5F9E",
  },
});

const CardInner = styled(Card)({
  width: "inherit",
  height: "inherit",
  boxShadow: "0 0 10px #FF5F9E",
  backdropFilter: "blur(1rem)",
  borderRadius: "8px",
});


const StyledEditButton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "15rem",
  height: "3.5rem",
  backgroundSize: "300% 300%",
  backdropFilter: "blur(1rem)",
  borderRadius: "2rem",
  transition: "0.5s",
  "@keyframes gradient_301": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  animation: "gradient_301 5s ease infinite",
  border: "double 4px transparent",
  backgroundImage:
    "linear-gradient(#060047, #060047), linear-gradient(138.47deg, rgba(255,95,158,1) 0%, rgba(179,0,94,1) 30%, #FFF 76%, rgba(255,95,158,1) 100%)",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&:hover #container-stars": {
    zIndex: 1,
    backgroundColor: "#060047",
  },
  "&:active": {
    border: "double 4px #FE53BB",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    animation: "none",
  },
  "&:active #circle": {
    background: "#FE53BB",
  },
});



const StyledContainer = styled(Container)({
  position: "absolute",
  zIndex: -1,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  transition: "0.5s",
  backdropFilter: "blur(1rem)",
  borderRadius: "5rem",
});

const StyledGlowBox = styled(Box)({
  position: "absolute",
  display: "flex",
  width: "12rem",
});

const StyledCircleBox = styled(Box)({
  width: "100%",
  height: "30px",
  filter: "blur(2rem)",
  "@keyframes pulse_3011": {
    "0%": {
      transform: "scale(0.75)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)",
    },
    "70%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
    },
    "100%": {
      transform: "scale(0.75)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    },
  },
  animation: "pulse_3011 4s infinite",
  zIndex: -1,
  "&:nth-of-type(1)": {
    background: "#060047",
  },
  "&:nth-of-type(2)": {
    background: "#B3005E",
  },
});

const StyledStars = styled(Box)({
  position: "relative",
  background: "transparent",
  width: "200rem",
  height: "200rem",
  "@keyframes animStar": {
    from: {
      transform: "translateY(0)",
    },
    to: {
      transform: "translateY(-135rem)",
    },
  },

  "@keyframes animStarRotate": {
    from: {
      transform: "rotate(360deg)",
    },

    to: {
      transform: "rotate(0)",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-10rem",
    left: "-100rem",
    width: "100%",
    height: "100%",
    animation: "animStarRotate 90s linear infinite",
    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
    backgroundSize: "50px 50px",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-50%",
    width: "170%",
    height: "500%",
    animation: "animStar 60s linear infinite",
    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
    backgroundSize: "50px 50px",
    opacity: "0.5",
  },
});

const EditButton = ({ onClick }) => {
  const handleEditButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledEditButton onClick={handleEditButtonClick}>
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          zIndex: "2",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "15px",
          letterSpacing: "5px",
          color: "#FFFFFF",
          textShadow: "0 0 4px white",
        }}
      >
        <span style={{ marginRight: "5px" }}>Edit</span>
        <EditIcon sx={{ fontSize: 15 }} />
      </Typography>
      <StyledContainer id="container-stars">
        <StyledStars></StyledStars>
      </StyledContainer>
      <StyledGlowBox id="glow">
        <StyledCircleBox id="circle" />
        <StyledCircleBox id="circle" />
      </StyledGlowBox>
    </StyledEditButton>
  );
};

const SaveButton = ({ onClick }) => {
  const handleSaveButtonClick = async () => {
    if (onClick) {
      await onClick(); // Wait for the click event to complete
    }
  };
  return (
    <StyledEditButton as="button" onClick={handleSaveButtonClick} type="submit">
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          zIndex: "2",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "15px",
          letterSpacing: "5px",
          color: "#FFFFFF",
          textShadow: "0 0 4px white",
        }}
      >
        <span style={{ marginRight: "5px" }}>Save</span>
        <EditIcon sx={{ fontSize: 15 }} />
      </Typography>
      <StyledContainer id="container-stars">
        <StyledStars></StyledStars>
      </StyledContainer>
      <StyledGlowBox id="glow">
        <StyledCircleBox id="circle" />
        <StyledCircleBox id="circle" />
      </StyledGlowBox>
    </StyledEditButton>
  );
};


const PaymentButton = ({ onClick }) => {
  const Icon = styled(Box)({
    background: "white",
    marginLeft: "1em",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5em",
    width: "2.5em",
    borderRadius: "2em",
    boxShadow: "0.1em 0.1em 0.6em 0.2em #FF5F9E",
    right: "0.3em",
    transition: "all 0.3s",
    id: "Icon",
    
  
  });
  return (
    <Button
      
      sx={{
        background: '#FF5F9E',
        color: 'white',
        fontFamily: 'inherit',
        padding: '0.35em',
        paddingLeft: '1.2em',
        fontSize: '17px',
        fontWeight: 'bold',
        borderRadius: '2em',
        border: 'none',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'inset 0 0 1.6em -0.6em #714da6',
        overflow: 'hidden',
        position: 'relative',
        height: '3.5rem',
        width: '13rem',
        paddingRight: '3.3em',
        transition: "all 0.3s",

        '&:hover' : {
          
        },

        '&:active #Icon': {
          
          transform: "scale(0.95)",
        },

        '&:hover #Icon': {
          
          width: "calc(100% - 0.6em)",
        },
      }} >  Payment
        <Icon id = "Icon">
          <PaymentOutlinedIcon sx={{width: "1.1em",
  transition: "transform 0.3s",
  color:  '#FF5F9E'}}></PaymentOutlinedIcon>
        </Icon>
     
    </Button>
  );
};

const PasswordButton = ({ onClick }) => {
  const Icon = styled(Box)({
    background: "white",
    marginLeft: "1em",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5em",
    width: "2.5em",
    borderRadius: "2em",
    boxShadow: "0.1em 0.1em 0.6em 0.2em #FF5F9E",
    right: "0.3em",
    transition: "all 0.3s",
    id: "Icon",
    
  
  });
  return (
    <Button
      
      sx={{
        background: '#E90064',
        color: 'white',
        fontFamily: 'inherit',
        padding: '0.35em',
        paddingLeft: '1.2em',
        fontSize: '17px',
        fontWeight: 'bold',
        borderRadius: '2em',
        border: 'none',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'inset 0 0 1.6em -0.6em #714da6',
        overflow: 'hidden',
        position: 'relative',
        height: '3.5rem',
        width: '13rem',
        paddingRight: '3.3em',
        transition: "all 0.3s",

        '&:hover' : {
          
        },
        '&:active #Icon': {
          
          transform: "scale(0.95)",
        },

        '&:hover #Icon': {
          
          width: "calc(100% - 0.6em)",
        },
      }} >  Password
        <Icon id = "Icon">
          <PasswordOutlinedIcon sx={{width: "1.1em",
  transition: "transform 0.3s",
  color: '#E90064'}}></PasswordOutlinedIcon>
        </Icon>
     
    </Button>
  );
};

const HomeButton = ({ onClick }) => {
  const Icon = styled(Box)({
    background: "white",
    marginRight: "1em",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5em",
    width: "2.5em",
    borderRadius: "2em",
    boxShadow: "0.1em 0.1em 0.6em 0.2em #060047",
    left: "0.3em",
    transition: "all 0.3s",
    id: "Icon",
    
  
  });
  return (
    <Button
      
      sx={{
        background: '#060047',
        color: 'white',
        fontFamily: 'inherit',
        padding: '0.35em',
        paddingRight: '1.2em',
        fontSize: '17px',
        fontWeight: 'bold',
        borderRadius: '2em',
        border: 'none',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'inset 0 0 1.6em -0.6em #714da6',
        overflow: 'hidden',
        position: 'relative',
        height: '3.5rem',
        width: '10rem',
        paddingLeft: '3.3em',
        transition: "all 0.3s",

        '&:hover' : {
          
        },
        '&:active #Icon': {
          
          transform: "scale(0.95)",
        },

        '&:hover #Icon': {
          
          width: "calc(100% - 0.6em)",
        },
      }} >  Home
        <Icon id = "Icon">
          <ArrowBackOutlinedIcon sx={{width: "1.1em",
  transition: "transform 0.3s",
  color: '#060047'}}></ArrowBackOutlinedIcon>
        </Icon>
     
    </Button>
  );
};

const StyledForm = styled(Box)({
  width: "200px",
  height: "10px",
  position: "relative",
  marginTop: "-3px",

  overflow: "visible",
});

const StyledInput = styled(Input)({
  color: "#B3005E",
  
  fontSize: "15px",
  backgroundColor: "transparent",
  width: "300px",
  height: "30px",
  boxSizing: "border-box",
  paddingInline: "0.5em",
  paddingBlock: "0.7em",
  border: "none",
  borderBottom: "transparent",
  "& .input-border": {
    position: "absolute",
    background: "#5891ff",
    width: "0%",
    height: "2px",
    bottom: "0",
    left: "0",
    transition: "0.3s",
  },
  "&:hover": {
    background: "#4985e01f",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus ~ .input-border": {
    width: "100%",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});
const NewDesign = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [editMode, setEditMode] = useState(false);

  const handleEditIconClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (values, onSubmitProps) => {
    fetch(`http://localhost:5000/profile/${user._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUser = {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
        dispatch(updateUser({ user: updatedUser }));
        setEditMode(false);
      })
      .catch((error) => console.error(error));

    setEditMode(false);
  };

  return (
    <Formik
      onSubmit={handleSaveClick}
      validationSchema={editSchema}
      initialValues={user}
    >
      {({ handleChange, handleSubmit, handleBlur }) => (
        <form onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <MainProfile>
              <ProfileContainer>
                <StarAnimation></StarAnimation>
                <Box
                  sx={{
                    backgroundImage: `url(${BotBackgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                  }}
                >
                  <TopPortion>
                    <Background
                      sx={{
                        background: "rgb(6,0,71)",
                        background:
                          "linear-gradient(0deg, rgba(6,0,71,1) 0%, rgba(179,0,94,1) 100%)",
                      }}
                    >
                     
                    </Background>
                    
                    <Box
                      sx={{
                        
                        position: "absolute",
                        
                        
                        marginLeft: "50px",
                        
                        
                        bottom: "5rem",
                        
                      }}
                    >
                      
                      <HomeButton sx= {{position: "absolute",right: "42.75%"}} onClick={handleEditIconClick}></HomeButton>
                    </Box>

                    <Stack direction = "row"
                      sx={{
                        
                        position: "absolute",
                        
                        
                        marginLeft: "85%",
                        
                        
                        bottom: "1.5rem",
                        
                      }}
                    >
                      
                      <h1> </h1>
                      <Stack direction = "row" display="flex"
        justifyContent="center"
        alignItems="center">
          <h1 > 300</h1>
                       <Box
        
        sx={{
          backgroundImage: `url(${SmashDong})`,
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: 150,
          height: 150,
          
        }}
      ></Box>
                      
                      
                      </Stack>
                    </Stack>
                    <Box
                      sx={{
                        height: "220px",
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "220px",
                        borderRadius: "50%",
                        
                        right: "42.75%",
                        
                        backgroundColor: "#251b5b",
                        bottom: "-3rem",
                        border: "10px #251b5b",
                      }}
                    >
                      
                      <UserImage>
                        <Avatar image={Ava}></Avatar>
                      </UserImage>
                    </Box>
                  </TopPortion>

                  

                  <Stack
                    direction={"row"}
                    style={{
                      opacity: 1,
                      backgroundColor: "red",
                      overflow: "visible", // Allow content to overflow
                      position: "relative",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      style={{
                        color: "whitesmoke",
                        position: "absolute",
                        top: "50px",
                        fontWeight: "bold",
                        
                      }}
                      fontSize={30}
                    >
                      Nguyen Khac Hoang
                    </Typography>
                  </Stack>
                  <Box display="flex" justifyContent="center">
                    <Stack

                      direction="row"
                      spacing={2}
                      style={{ opacity: 1, marginTop: "130px",marginLeft: "100px" }}
                    >
                      <CustomCard sx={{ width: "310px" }}>
                        <CardInner sx = {{background: "#060047",}}>
                          <Stack direction="column">
                            <Box
                              sx={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: "#060047",
                              }}
                            >
                              <Typography
                                style={{
                                  width: "inherit",
                                  color: "whitesmoke",
                                  marginTop: "20px",
                                  marginBottom: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                }}
                                fontSize={30}
                              >
                                About me
                              </Typography>
                            </Box>
                            
                            <Box
                              display="flex"
                              sx={{ width: "100%", height: "250px", justifyItems: "center" }}
                            >
                              <Typography sx={{ color: "whitesmoke" }}>
                                <Stack
                                  direction="column"
                                  sx={{
                                    backgroundColor: "whitesmoke",
                                    color: "whitesmoke",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    marginLeft: "25px",
                                    borderRadius: "25px",
                                    width: "100%",
                                    height: "250px"

                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    sx={{
                                      color: "whitesmoke",
                                      marginLeft: "15px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    <MovieCreationOutlinedIcon
                                      sx={{ color: "#060047", fontSize: 60,  }}
                                    ></MovieCreationOutlinedIcon>
                                    <Stack
                                      direction="column"
                                      sx={{
                                        color: "whitesmoke",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        fontSize={(18 / 6) * 5}
                                        fontWeight="bold"
                                        style={{
                                          color: "#060047",
                                          marginTop: "3px",
                                        }}
                                      >
                                        Total Movies
                                      </Typography>
                                      <Typography
                                        fontSize={25}
                                        style={{
                                          color: "#060047",
                                        }}
                                      >
                                        929
                                      </Typography>
                                    </Stack>
                                  </Stack>

                                  <Stack
                                    direction="row"
                                    sx={{
                                      color: "whitesmoke",
                                      marginTop: "10px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    <ShoppingBasketOutlinedIcon
                                      sx={{ color: "#060047", fontSize: 60 }}
                                    ></ShoppingBasketOutlinedIcon>
                                    <Stack
                                      direction="column"
                                      sx={{
                                        color: "#060047",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        fontSize={(18 / 6) * 5}
                                        fontWeight="bold"
                                        style={{
                                          color: "#060047",
                                          marginTop: "3px",
                                        }}
                                      >
                                        Current Lending
                                      </Typography>
                                      <Typography
                                        fontSize={25}
                                        style={{
                                          color: "#060047",
                                          fontWeight: "regular",
                                        }}
                                      >
                                        320
                                      </Typography>
                                    </Stack>
                                  </Stack>

                                  <Stack
                                    direction="row"
                                    sx={{
                                      color: "whitesmoke",
                                      marginTop: "10px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    <ThumbUpAltOutlinedIcon
                                      sx={{ color: "#060047", fontSize: 60 }}
                                    ></ThumbUpAltOutlinedIcon>
                                    <Stack
                                      direction="column"
                                      sx={{
                                        color: "whitesmoke",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        fontSize={(18 / 6) * 5}
                                        fontWeight="bold"
                                        style={{
                                          color: "#060047",
                                          marginTop: "3px",
                                        }}
                                      >
                                        Total Favorite
                                      </Typography>
                                      <Typography
                                        fontSize={25}
                                        fontWeight="regular"
                                        style={{
                                          color: "#060047",
                                        }}
                                      >
                                        210
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </Typography>
                            </Box>
                          </Stack>
                        </CardInner>
                      </CustomCard>

                      <CustomCard sx = {{width: "370px"}}>
                        <CardInner sx = {{background: "#B3005E",}}>
                          <Stack direction="column">
                            <Box
                              sx={{
                                width: "100%",
                                height: "30%",
                                backgroundColor: "#B3005E",
                              }}
                            >
                              <Typography
                                style={{
                                  width: "inherit",
                                  color: "whitesmoke",
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                }}
                                fontSize={30}
                              >
                                Infomation
                              </Typography>
                            </Box>
                            <Stack
                              direction="column"
                              spacing={1.5}
                              style={{ marginTop: "0px", borderRadius: "25px", backgroundColor: "whitesmoke",width: "90%",marginLeft: "19px",
                              height: "150px"}}
                            >
                              <Stack direction="row" marginRight={1} style={{ marginTop: "22.5px" }} >
                                <Typography
                                  fontSize={15}
                                  fontWeight="bold"
                                  marginRight={1}
                                  marginLeft={2}
                                  style={{
                                    color: "#B3005E",
                                  }}
                                >
                                  First name:
                                </Typography>
                                {!editMode ? (
                                  <Typography
                                    marginLeft={1}
                                    fontSize={15}
                                    fontWeight="bold"
                                    data-testid="user-first-name"
                                    style={{
                                      color: "#B3005E",
                                    }}
                                  >
                                    {user.firstName}
                                  </Typography>
                                ) : (
                                  <StyledForm>
                                    <StyledInput
                                      placeholder="Type your text"
                                      required
                                      type="text"
                                      defaultValue={user.firstName}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      name="firstName"
                                      inputProps={{
                                        "data-testid": "user-fisrt-name-input",
                                      }}
                                    />
                                    <span className="input-border" />
                                  </StyledForm>
                                )}
                              </Stack>
                              <Stack
                                direction="row"
                                style={{ marginTop: "20px" }}
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight="bold"
                                  marginRight={2}
                                  marginLeft={2}
                                  style={{
                                    color: "#B3005E",
                                    
                                  }}
                                >
                                  Last name:
                                </Typography>
                                {!editMode ? (
                                  <Typography
                                    marginLeft={1}
                                    fontSize={15}
                                    fontWeight="bold"
                                    data-testid="user-last-name"
                                    style={{
                                      color: "#B3005E",
                                      
                                    }}
                                  >
                                    {user.lastName}
                                  </Typography>
                                ) : (
                                  <StyledForm>
                                    <StyledInput
                                      marginLeft={1}
                                      placeholder="Type your text"
                                      required
                                      type="text"
                                      defaultValue={user.lastName}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      name="lastName"
                                      inputProps={{
                                        "data-testid": "user-lastname-input",
                                      }}
                                    />
                                    <span className="input-border" />
                                  </StyledForm>
                                )}
                              </Stack>

                              <Stack
                                direction="row"
                                style={{ marginTop: "20px" }}
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight="bold"
                                  marginRight={1}
                                  marginLeft={2}
                                  style={{
                                    color: "#B3005E",
                                    
                                  }}
                                >
                                  Email:
                                </Typography>
                                {!editMode ? (
                                  <Typography
                                    marginLeft={1}
                                    fontSize={15}
                                    fontWeight="bold"
                                    data-testid="user-email"
                                    style={{
                                      color: "#B3005E",
                                      
                                    }}
                                  >
                                    {user.email}
                                  </Typography>
                                ) : (
                                  <StyledForm>
                                    <StyledInput
                                      placeholder="Type your text"
                                      required
                                      type="text"
                                      defaultValue={user.email}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      name="email"
                                      inputProps={{
                                        "data-testid": "user-email-input",
                                      }}
                                    />
                                    <span className="input-border" />
                                  </StyledForm>
                                )}

                                
                              </Stack>
                              <Stack
                    direction={"row"}
                    style={{
                      marginLeft: "50px",
                      opacity: 1,
                      overflow: "visible", // Allow content to overflow
                      position: "relative",
                      marginTop: 50,
                      marginLeft:100,
                    }}
                  >
                    {editMode ? (
                      <SaveButton
                        onClick={() => handleSaveClick(values, onSubmitProps)}
                      />
                    ) : (
                      <EditButton onClick={handleEditIconClick}></EditButton>
                    )}
                  </Stack>
                              
                            </Stack>
                          </Stack>
                        </CardInner>
                      </CustomCard>
                      <Stack
                    direction={"column"}
                    style={{
                      marginLeft: "50px",
                      marginTop: "20px",
                      opacity: 1,
                      overflow: "visible", // Allow content to overflow
                      position: "relative",
                      
                    }}
                  >
                    {editMode ? (
                      <Box>
                      <PasswordButton
                        onClick={() => handleSaveClick(values, onSubmitProps)}
                      />
                      
                      </Box>
                    ) : (
                      <PasswordButton onClick={handleEditIconClick}></PasswordButton>
                    )}
                      <Box sx= {{marginTop: "30px",}}>
                      <PaymentButton sx= {{marginTop: "100px",}} onClick={handleEditIconClick}></PaymentButton>
                      </Box>
                  </Stack>
                    </Stack>
                  </Box>
                </Box>
              </ProfileContainer>
            </MainProfile>
          </ThemeProvider>
        </form>
      )}
    </Formik>
  );
};

export default NewDesign;
