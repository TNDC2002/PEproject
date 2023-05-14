import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import NavPage from "./scenes/profilePage";
import Original from "./scenes/profilePage/Original";
import NewDesign from "./scenes/profilePage/NewDesign";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MoviePage from "./scenes/moviePage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userID"
              element={isAuth ? <NavPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userID/Original"
              element={isAuth ? <Original /> : <Navigate to="/" />}
            />

            <Route
              path="/profile/:userID/NewDesign"
              element={isAuth ? <NewDesign /> : <Navigate to="/" />}
            />
            <Route
              path="/movie/:movieID"
              element={isAuth ? <MoviePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
