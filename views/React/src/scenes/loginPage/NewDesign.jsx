import { useState } from "react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sizing } from "@mui/system";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Container,
  Checkbox,
  Stack,
  CssBaseline,
  Paper,
  Grid,
} from "@mui/material";

import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import LoginIcon from "@mui/icons-material/Login";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "../../assets/images/background.png";
import Card from "../../assets/images/SmashBruh.png";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode, setLogin } from "../../states";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup
    .string()
    .email("invalid email")
    .required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "black",
          },
        },
      },
    },
  },
});

const NewDesign = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const picRegister = pageType === "picRegister";
  const newAcc = pageType === "newAcc";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:5000/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Container
            maxWidth={false}
            sx={{
              backgroundImage: `url(${Image})`,
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Container>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
              >
                <Grid container justifyContent="center">
                  <CssBaseline />

                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                      height: "100%",
                      backgroundColor: "whitesmoke",
                      opacity: "0.9",
                    }}
                    color="black"
                  >
                    <Box
                      sx={{
                        height: "100%",

                        my: 10,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0}
                        justifyContent="center"
                      >
                        <Typography style={{ color: "#B3005E" }} fontSize={40}>
                          Smash
                        </Typography>

                        <Typography style={{ color: "#060047" }} fontSize={40}>
                          Bruh
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={8}
                        justifyContent="center"
                      >
                        <Button
                          startIcon={<LoginIcon />}
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
                          {isLogin ? (
                            <Typography
                              sx={{
                                color: "#B3005E",
                                textDecoration: "underline",
                                "&:hover": {
                                  textDecoration: "underline black",
                                },
                              }}
                              display="inline"
                              style={{ color: "#B3005E" }}
                              fontSize={20}
                            >
                              Sign in
                            </Typography>
                          ) : (
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
                              Sign in
                            </Typography>
                          )}
                        </Button>

                        <Button
                          startIcon={<AppRegistrationTwoToneIcon />}
                          variant="text"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "50px",
                            minWidth: "30px",
                            minHeight: "30px",
                          }}
                          onClick={() => {
                            setPageType("register");
                            resetForm();
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
                          {isLogin ? (
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
                          ) : (
                            <Typography
                              sx={{
                                color: "#B3005E",
                                textDecoration: "underline",
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
                          )}
                        </Button>
                      </Stack>

                      <ThemeProvider theme={theme}>
                        {isRegister ? (
                          <Box>
                            <Typography fontSize={18}  color="#B3005E">
                              What is your name?
                            </Typography>
                            <TextField
                              label="First Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              name="firstName"
                              error={
                                Boolean(touched.firstName) &&
                                Boolean(errors.firstName)
                              }
                              helperText={touched.firstName && errors.firstName}
                              sx={{ gridColumn: "span 2" }}
                              margin="normal"
                              required
                              fullWidth
                            />

                            <TextField
                              label="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              error={
                                Boolean(touched.lastName) &
                                Boolean(errors.lastName)
                              }
                              helperText={touched.lastName && errors.lastName}
                              sx={{ gridColumn: "span 2" }}
                              margin="normal"
                              required
                              fullWidth
                            />
                            <Stack
                              direction="row"
                              spacing={8}
                              justifyContent="right"
                            >
                              <Button
                                variant="text"
                                endIcon={<NavigateNextIcon />}
                                sx={{
                                  height: 70,
                                  color: "#B3005E",
                                }}
                                onClick={() => {
                                  setPageType("picRegister");
                                }}
                              >
                                Next step
                              </Button>
                            </Stack>
                          </Box>
                        ) : isLogin ? (
                          <Box>
                            <TextField
                              label="Email Address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              name="email"
                              error={
                                Boolean(touched.email) && Boolean(errors.email)
                              }
                              helperText={touched.email && errors.email}
                              sx={{ gridColumn: "span 4" }}
                              margin="normal"
                              required
                              fullWidth
                            />
                            <TextField
                              label="Password"
                              type="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              name="password"
                              error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                              }
                              helperText={touched.password && errors.password}
                              sx={{ gridColumn: "span 4" }}
                              margin="normal"
                              required
                              fullWidth
                            />

                            <FormControlLabel
                              control={
                                <Checkbox value="remember" color="primary" />
                              }
                              label="Remember me"
                            />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ height: 40, mt: 3, mb: 2 }}
                            >
                              <Typography
                                style={{ color: "whitesmoke" }}
                                fontSize={15}
                              >
                                Sign in
                              </Typography>
                            </Button>
                          </Box>
                        ) : picRegister ? (
                          <Box maxWidth="100%" width="100%" px={2}>
                            <Typography fontSize={18} color="#B3005E">
                              Add your profile picture
                            </Typography>
                            <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '23.3vh',marginTop: '16px'}}>
                              <Box
                                gridColumn="span 4"
                                border={`1px solid #B3005E`}
                                borderRadius="5px"
                                
                                sx={{ width: "180px", height: "180px", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                              >
                                <Dropzone
                                  acceptedFiles=".jpg,.jpeg,.png"
                                  multiple={false}
                                  onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                  }
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <Box
                                      {...getRootProps()}
                                      border={`2px dashed #B3005E`}
                                      
                                      sx={{
                                        "&:hover": { cursor: "pointer" },
                                        width: "150px",
                                        height: "150px",
                                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                                      }}
                                    >
                                      <input
                                        {...getInputProps()}
                                        name="picture"
                                      />
                                      {!values.picture ? (
                                        <p>Add Picture Here</p>
                                      ) : (
                                        <FlexBetween>
                                          <Typography>
                                            {values.picture.name}
                                          </Typography>
                                          <ModeEditOutlinedIcon />
                                        </FlexBetween>
                                      )}
                                    </Box>
                                  )}
                                </Dropzone>
                              </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Button
                                variant="text"
                                startIcon={<NavigateBeforeIcon />}
                                sx={{
                                  height: 70,
                                  color: "#B3005E",
                                }}
                                onClick={() => {
                                  setPageType("register");
                                }}
                              >
                                Last step
                              </Button>
                              <Button
                                variant="text"
                                endIcon={<NavigateNextIcon />}
                                sx={{
                                  height: 70,
                                  color: "#B3005E",
                                }}
                                onClick={() => {
                                  setPageType("");
                                }}
                              >
                                Next step
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Box>
                            <Typography fontSize={18} color="#B3005E">
                              Enter your email and password
                            </Typography>
                            <TextField
                              label="Email Address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              name="email"
                              error={
                                Boolean(touched.email) && Boolean(errors.email)
                              }
                              helperText={touched.email && errors.email}
                              sx={{ gridColumn: "span 4" }}
                              margin="normal"
                              required
                              fullWidth
                            />
                            <TextField
                              label="Password"
                              type="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              name="password"
                              error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                              }
                              helperText={touched.password && errors.password}
                              sx={{ gridColumn: "span 4" }}
                              margin="normal"
                              required
                              fullWidth
                              
                            />
                            <Box display="flex" justifyContent="space-between">
                              <Button
                                variant="text"
                                startIcon={<NavigateBeforeIcon />}
                                sx={{
                                  height: 70,
                                  color: "#B3005E",
                                }}
                                onClick={() => {
                                  setPageType("picRegister");
                                }}
                              >
                                Last step
                              </Button>
                              <Button
                                variant="text"
                                type="submit"
                                endIcon={<NavigateNextIcon />}
                                sx={{
                                  height: 70,
                                  color: "#B3005E",
                                }}
                                
                                onClick={() => {
                                  
                                  handleSubmit();
                                  resetForm();
                                  setPageType("login");
                                }}

                              >
                                Finish registration
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </ThemeProvider>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                      backgroundImage: `url(${Card})`,
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Grid>
              </Box>
            </Container>
          </Container>
        </form>
      )}
    </Formik>
  );
};

export default NewDesign;
