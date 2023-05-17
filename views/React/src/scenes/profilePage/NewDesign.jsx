import Ava from "../../assets/image/bob.png";
import accountCard from "../../assets/image/accountBox.png";
import movieCard from "../../assets/image/movieBox.png";
import BackgroundImage from "../../assets/image/profileCover2.jpg";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Translate } from "@mui/icons-material";

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

const CoverImage = ({ image }) => {
  return (
    <img
      style={{
        objectFit: "cover",
        objectPosition: "center top",
        width: "100%",
        height: "100%",
      }}
      src={`${image}`}
      alt=""
    />
  );
};

const MainProfile = styled(Box)({
  height: "100vh",
  width: "100vw",
  background: "lightgray",
  overflowX: Hidden,
});

const ProfileContainer = styled(Box)({
  height: "100vh",
  width: "90%",
  background: "#060047",
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
  background: "cyan",
  overflow: Hidden,
});

const UserImage = styled(Box)({
  position: "absolute",
  height: "110%",
  width: "15%",
  borderRadius: "50%",

  right: "42.5%",

  backgroundColor: "red",
  bottom: "-2rem",
  border: "5px solid white",
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
  borderRadius: "8px",
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
  background: "black",
  boxShadow: "0 0 10px #FF5F9E",
  backdropFilter: "blur(1rem)",
  borderRadius: "8px",
});

const StyledEditButton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "8rem",
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
    "linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&:hover #container-stars": {
    zIndex: 1,
    backgroundColor: "#212121",
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
    background: "red",
  },
  "&:nth-of-type(2)": {
    background: "blue",
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
          fontSize: "10px",
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
          fontSize: "10px",
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

const StyledForm = styled(Box)({
  
  width: "200px",
  height: "10px",
  position: "relative",
  marginTop: "-3px",
  
  overflow: "visible",
});

const StyledInput = styled(Input)({
  
  color: "#fff",
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
                <TopPortion>
                  <Background>
                    <CoverImage image={BackgroundImage}></CoverImage>
                  </Background>
                  <UserImage>
                    <Avatar image={Ava}></Avatar>
                  </UserImage>
                </TopPortion>
                <Stack
                  direction={"row"}
                  style={{
                    marginLeft: "50px",
                    opacity: 1,
                    overflow: "visible", // Allow content to overflow
                    position: "relative",
                  }}
                >
                  {editMode ? (
                    <SaveButton
                      onClick={() => handleSaveClick(values, onSubmitProps)}
                      sx={{ top: "-10px" }}
                    />
                  ) : (
                    <EditButton
                      onClick={handleEditIconClick}
                      sx={{ top: "-100px" }}
                    ></EditButton>
                  )}
                </Stack>

                <Stack
                  direction={"row"}
                  style={{
                    opacity: 1,
                    backgroundColor: "blue",
                    overflow: "visible", // Allow content to overflow
                    position: "relative",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    style={{
                      color: "whitesmoke",
                      position: "absolute",
                      top: "-10px",
                    }}
                    fontSize={30}
                  >
                    User 3152
                  </Typography>
                </Stack>
                <Box display="flex" justifyContent="center">
                  <Stack
                    direction="row"
                    spacing={40}
                    style={{ opacity: 1, marginTop: "70px" }}
                  >
                    <CustomCard>
                      <CardInner>
                        <Stack direction="column">
                          <Box
                            sx={{
                              width: "100%",
                              height: "30%",
                              backgroundColor: "whitesmoke",
                            }}
                          >
                            <Typography
                              style={{
                                width: "inherit",
                                color: "#B3005E",
                                marginTop: "20px",
                                marginBottom: "20px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                              fontSize={30}
                            >
                              About me
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            sx={{ width: "100%", height: "250px" }}
                          >
                            <Typography sx={{ color: "whitesmoke" }}>
                              <Stack
                                direction="column"
                                sx={{
                                  color: "whitesmoke",
                                  marginTop: "20px",
                                  marginLeft: "20px",
                                }}
                              >
                                <Stack
                                  direction="row"
                                  sx={{
                                    color: "whitesmoke",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <MovieCreationOutlinedIcon
                                    sx={{ color: "whitesmoke", fontSize: 70 }}
                                  ></MovieCreationOutlinedIcon>
                                  <Stack
                                    direction="column"
                                    sx={{
                                      color: "whitesmoke",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    <Typography
                                      fontSize={(20 / 6) * 5}
                                      fontWeight="bold"
                                      style={{
                                        color: "#FF5F9E",
                                        marginTop: "3px",
                                      }}
                                    >
                                      Total Movies
                                    </Typography>
                                    <Typography
                                      fontSize={25}
                                      style={{
                                        color: "whitesmoke",
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
                                    marginTop: "20px",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <ShoppingBasketOutlinedIcon
                                    sx={{ color: "whitesmoke", fontSize: 70 }}
                                  ></ShoppingBasketOutlinedIcon>
                                  <Stack
                                    direction="column"
                                    sx={{
                                      color: "whitesmoke",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    <Typography
                                      fontSize={(20 / 6) * 5}
                                      fontWeight="bold"
                                      style={{
                                        color: "#FF5F9E",
                                        marginTop: "3px",
                                      }}
                                    >
                                      Current Lending
                                    </Typography>
                                    <Typography
                                      fontSize={25}
                                      style={{
                                        color: "whitesmoke",
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
                                    marginTop: "20px",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <ThumbUpAltOutlinedIcon
                                    sx={{ color: "whitesmoke", fontSize: 70 }}
                                  ></ThumbUpAltOutlinedIcon>
                                  <Stack
                                    direction="column"
                                    sx={{
                                      color: "whitesmoke",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    <Typography
                                      fontSize={(20 / 6) * 5}
                                      fontWeight="bold"
                                      style={{
                                        color: "#FF5F9E",
                                        marginTop: "3px",
                                      }}
                                    >
                                      Total Favorite
                                    </Typography>
                                    <Typography
                                      fontSize={25}
                                      fontWeight="regular"
                                      style={{
                                        color: "whitesmoke",
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

                    <CustomCard>
                      <CardInner>
                        <Stack direction="column">
                          <Box
                            sx={{
                              width: "100%",
                              height: "30%",
                              backgroundColor: "whitesmoke",
                            }}
                          >
                            <Typography
                              style={{
                                width: "inherit",
                                color: "#B3005E",
                                marginTop: "20px",
                                marginBottom: "20px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                              fontSize={30}
                            >
                              Infomation
                            </Typography>
                          </Box>
                          <Stack
                            direction="column"
                            spacing={1.5}
                            style={{ marginTop: "40px" }}
                          >
                            <Stack direction="row" marginRight={1}>
                              <Typography
                                fontSize={15}
                                fontWeight="bold"
                                marginRight={1}
                                marginLeft={2}
                                style={{
                                  color: "whitesmoke",
                                }}
                              >
                                First name:
                              </Typography>
                              {!editMode ? (
                                <Typography
                                  marginLeft = {1}
                                  fontSize={15}
                                  fontWeight="light"
                                  data-testid="user-first-name"
                                  style={{
                                    color: "whitesmoke",
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
                                  color: "whitesmoke",
                                  
                                }}
                              >
                                Last name:
                                
                              </Typography>
                              {!editMode ? (
                                <Typography
                                  marginLeft = {1}
                                  fontSize={15}
                                  fontWeight="light"
                                  data-testid="user-last-name"
                                  style={{
                                    color: "whitesmoke",
                                  }}
                                >
                                  {user.lastName}
                                </Typography>
                              ) : (
                                <StyledForm>
                                <StyledInput
                                  marginLeft = {1}
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
                                  color: "whitesmoke",
                                }}
                              >
                                Email:
                              </Typography>
                              {!editMode ? (
                                <Typography
                                  marginLeft = {1}
                                  fontSize={15}
                                  fontWeight="light"
                                  data-testid="user-email"
                                  style={{
                                    color: "whitesmoke",
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
                              direction="row"
                              style={{ marginTop: "20px" }}
                            >
                              <Typography
                                fontSize={15}
                                fontWeight="bold"
                                marginRight={1}
                                marginLeft={2}
                                style={{
                                  color: "whitesmoke",
                                }}
                              >
                                Phone Number:
                              </Typography>
                              {!editMode ? (
                                <Typography
                                marginLeft = {1}
                                  fontSize={15}
                                  fontWeight="light"
                                  data-testid="user-phoneNumber"
                                  style={{
                                    color: "whitesmoke",
                                  }}
                                >
                                  add phone number
                                </Typography>
                              ) : (
                                <StyledForm>
                                <StyledInput
                                  
                                  placeholder="Type your text"
                                  required
                                  type="text"
                                  defaultValue={"add phone number"}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name="email"
                                  inputProps={{
                                    "data-testid": "add phone number",
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
                                  color: "whitesmoke",
                                }}
                              >
                                Address:
                              </Typography>
                              {!editMode ? (
                                <Typography
                                  marginLeft = {1}
                                  fontSize={15}
                                  fontWeight="light"
                                  data-testid="user-Address"
                                  style={{
                                    color: "whitesmoke",
                                  }}
                                >
                                  add address
                                </Typography>
                              ) : (
                                <StyledForm>
                                <StyledInput
                                  
                                  placeholder="Type your text"
                                  required
                                  type="text"
                                  defaultValue={"add address"}
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
                          </Stack>
                        </Stack>
                      </CardInner>
                    </CustomCard>
                  </Stack>
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
