import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
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
  const isAuth = async () => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/info", {
      method: "Get",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
    const loggedIn = await loggedInResponse.json();
    return (loggedIn.authenticated)
  };
  
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/movie/:movieID"
              element={isAuth ? <MoviePage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/TV Shows"
              element={isAuth ? <TvPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/TV Shows/:showID"
              element={isAuth ? <ShowPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/profile/:userID"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" replace />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;