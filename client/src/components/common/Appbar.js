import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../../assets/images/logo.png";

const pages = ["About", "Privacy Policy"];
const authPages = ["Playlist Select"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoutClick = () => {
    logout();
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  const buttonStyle = {
    my: 0.5,
    mx: 0.5,
    color: "black",
    display: "block",
    transition: "color 0.3s ease",
    textTransform: "lowercase",
    "&:hover": {
      color: "#1db954",
      backgroundColor: "transparent",
      "& .MuiTypography-root": {
        color: "#1db954",
      },
    },
  };

  const navigateToPage = (page) => {
    handleCloseNavMenu();
    const formattedPage = page.toLowerCase().replace(/\s+/g, ""); // Remove spaces
    navigate(`/${formattedPage}`);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        color: "black",
        boxShadow: "none",
        borderBottom: "3px solid #1CB955",
      }}
    >
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              key={"coverify"}
              onClick={() => navigate("/")}
              sx={{ ...buttonStyle, color: "black" }}
            >
              <img
                style={{
                  width: "100px",
                  height: "70px",
                  objectFit: "cover",
                }}
                src={logo}
                alt="Character Logo"
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateToPage(page)}
                sx={{ ...buttonStyle }}
              >
                <Typography variant="h6">{page.toLowerCase()}</Typography>
              </Button>
            ))}
            {loggedIn &&
              authPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigateToPage(page)}
                  sx={{ ...buttonStyle }}
                >
                  <Typography variant="h6">{page.toLowerCase()}</Typography>
                </Button>
              ))}
            {loggedIn && (
              <Button
                onClick={handleLogoutClick}
                sx={{ ...buttonStyle }}
                color="inherit"
              >
                <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                  Logout
                </Typography>
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateToPage(page)}>
                  <Typography variant="body1">{page}</Typography>
                </MenuItem>
              ))}
              {loggedIn &&
                authPages.map((page) => (
                  <MenuItem key={page} onClick={() => navigateToPage(page)}>
                    <Typography variant="body1">{page}</Typography>
                  </MenuItem>
                ))}
              {loggedIn && (
                <MenuItem onClick={handleLogoutClick}>
                  <Typography variant="body1">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
