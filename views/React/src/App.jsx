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
import MyListPage from "./scenes/mylistPage";

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
              path="/movie/:movieID"
              element={isAuth ? <MoviePage /> : <Navigate to="/" />}
            />
            <Route
              path="/TV Shows"
              element={isAuth ? <TvPage /> : <Navigate to="/" />}
            />
            <Route
              path="/TV Shows/:showID"
              element={isAuth ? <ShowPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userID"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/my list"
              element={isAuth ? <MyListPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
