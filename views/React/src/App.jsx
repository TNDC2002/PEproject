import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import TvPage from "./scenes/tvPage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MoviePage from "./scenes/moviePage";
import ShowPage from "./scenes/showPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/info", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        console.log("isAUTH:", data.authenticated); // Log the authentication data
        setAuthenticated(data.authenticated);
        setLoading(false);
      } catch (error) {
        console.log("Authentication check error:", error);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                authenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/" replace state={{ from: "/home" }} />
                )
              }
            />
            <Route
              path="/movie/:movieID"
              element={
                authenticated ? (
                  <MoviePage />
                ) : (
                  <Navigate to="/" replace state={{ from: "/movie/:movieID" }} />
                )
              }
            />
            <Route
              path="/TV Shows"
              element={
                authenticated ? (
                  <TvPage />
                ) : (
                  <Navigate to="/" replace state={{ from: "/TV Shows" }} />
                )
              }
            />
            <Route
              path="/TV Shows/:showID"
              element={
                authenticated ? (
                  <ShowPage />
                ) : (
                  <Navigate to="/" replace state={{ from: "/TV Shows/:showID" }} />
                )
              }
            />
            <Route
              path="/profile/:userID"
              element={
                authenticated ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/" replace state={{ from: "/profile/:userID" }} />
                )
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;