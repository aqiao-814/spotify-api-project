import { Container, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coverifyLogo from "../../assets/images/CoverifyLogo.png";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:9090";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  return paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});
};

const Login = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);

      onLoginSuccess();
      setIsLoggedIn(true);

      if (access_token && isLoggedIn) {
        navigate("/playlistselect");
      }
    } else {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setIsLoggedIn(true);
      }
    }
  }, [onLoginSuccess, navigate, isLoggedIn]);

  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: "#1CB955",
    borderRadius: "50px",
    padding: "15px 30px",
    fontSize: "20px",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    textTransform: "lowercase",
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img
        src={coverifyLogo}
        alt="Coverify Logo"
        style={{ marginBottom: "20px", width: "70%" }}
      />
      <div>Designed to generate unique playlist covers using DALL·E</div>
      {isLoggedIn ? (
        <p>You are logged in.</p>
      ) : (
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={() => {
            window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
          }}
        >
          Log in with Spotify
        </Button>
      )}
    </Container>
  );
};

export default Login;
