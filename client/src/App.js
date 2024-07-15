import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./assets/css/index.css";
import ResponsiveAppBar from "./components/common/Appbar";
import About from "./pages/About";
import Login from "./components/auth/Login";
import Covers from "./components/features/Covers";
import PlaylistSel from "./components/features/PlaylistSel";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const savedLoggedInState = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(savedLoggedInState);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <ResponsiveAppBar loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/covers" element={<Covers />} />
            <Route path="/playlistselect" element={<PlaylistSel />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
