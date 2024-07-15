import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/PlaylistSel.css";
import { Link } from "react-router-dom";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const PlaylistSel = () => {
  const [playlists, setPlaylists] = useState([]);
  const [userId, setUserId] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const userResponse = await axios.get(
            "https://api.spotify.com/v1/me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setUserId(userResponse.data.id);

          let nextUrl = PLAYLISTS_ENDPOINT;
          let allPlaylists = [];

          while (nextUrl) {
            const response = await axios.get(nextUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const userPlaylists = response.data.items.filter(
              (playlist) => playlist.owner.id === userResponse.data.id
            );

            const playlistsWithImages = await Promise.all(
              userPlaylists.map(async (playlist) => {
                const coverResponse = await axios.get(
                  `https://api.spotify.com/v1/playlists/${playlist.id}/images`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
                const updatedImages =
                  coverResponse.data.length > 0 ? [coverResponse.data[0]] : [];
                return { ...playlist, updatedImages };
              })
            );

            allPlaylists = [...allPlaylists, ...playlistsWithImages];
            nextUrl = response.data.next;
          }

          setPlaylists(allPlaylists);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (index) => {
    setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
    const clickedPlaylist = playlists[index];
    localStorage.setItem("playlistID", clickedPlaylist.id);
  };

  return (
    <div className="playlist-container">
      <div className="playlist-text">
        <h2>Choose a playlist:</h2>
      </div>
      <div className="playlists">
        {playlists.map((playlist, index) => (
          <Link
            to={`/covers`}
            className={`playlist-button ${
              clickedIndex === index ? "clicked" : ""
            } no-underline`}
            key={playlist.id}
            onClick={() => handleButtonClick(index)}
          >
            {playlist.updatedImages.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image.url}
                alt={`Playlist Cover ${imageIndex + 1}`}
              />
            ))}
            <p>{playlist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSel;
