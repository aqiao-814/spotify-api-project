import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Covers.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Covers = () => {
  const { playlistName } = useParams();
  const [coverImages, setCoverImages] = useState([]);
  const [imagesGenerated, setImagesGenerated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const initialMount = useRef(true);

  const generatePrompt = (artists, titles) => {
    return `Give a photo realistic environment based on the artists: ${artists}. Also use the vibes from the songs: ${titles}`;
  };

  const fetchData = async () => {
    if (imagesGenerated) return;

    try {
      setLoading(true);
      setErrorMessage("");
      const accessToken = localStorage.getItem("accessToken");
      const storedPlaylistId = localStorage.getItem("playlistID");

      if (accessToken && storedPlaylistId) {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${storedPlaylistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const tracks = response.data.items.slice(0, 3);

        const trackDetailsPromises = tracks.map(async (track) => {
          const trackId = track.track.id;
          const trackResponse = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          return trackResponse.data;
        });

        const trackDetails = await Promise.all(trackDetailsPromises);

        // Get unique artist names
        const uniqueArtists = [
          ...new Set(
            trackDetails.flatMap((track) =>
              track.artists.map((artist) => artist.name)
            )
          ),
        ].join(", ");

        // Get track titles
        const titles = trackDetails.map((track) => track.name).join(", ");

        const detailedPrompt = generatePrompt(uniqueArtists, titles);

        console.log("Passing into server: ", detailedPrompt);

        if (coverImages.length === 0) {
          const imageUrls = await generateImageBasedOnTitle(detailedPrompt, 3);
          setCoverImages(imageUrls);
        }

        setImagesGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching top songs:", error);
      if (error.response && error.response.status === 429) {
        setErrorMessage("Please try again in a minute.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetchData();
    }
  }, []); // Run only once on mount

  const generateImageBasedOnTitle = async (title, count) => {
    try {
      const response = await axios.post("/api/generate-images", {
        prompt: title,
        count: count,
      });

      return response.data.imageUrls;
    } catch (error) {
      console.error("Error generating images:", error.response.status);
      setErrorMessage(
        "Please try again in a minute or check if you have sufficient OpenAI credits."
      );

      throw error;
    }
  };

  return (
    <div className="covers-container">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : errorMessage ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            {errorMessage}
          </Typography>
        </Box>
      ) : (
        <>
          <div className="covers-text">
            <h1>Here are the generated playlist covers: {playlistName}</h1>
          </div>
          <div className="covers-section">
            <div className="cover-images-container">
              {coverImages.length > 0 &&
                coverImages.map((imageUrl, index) => (
                  <div className="generated-cover" key={index}>
                    <img
                      src={imageUrl}
                      alt={`Generated Cover ${index + 1}`}
                      className="cover-image"
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Covers;
