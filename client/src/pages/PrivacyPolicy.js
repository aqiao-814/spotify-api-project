import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "150px" }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography paragraph>
        Spotify is an open-source application that utilizes the Spotify Web API.
        When you opt to use this application, you consent to the utilization of 
        your Spotify account username and data for creating your playlist covers.
      </Typography>
      <Typography paragraph>
        Coverify does not retain or gather any of the data used, and it is never 
        shared with third parties. All information is used solely for displaying 
        your playlist cover.
      </Typography>
      <Typography paragraph>
            Although you can rest assured that your data is not being stored or
            used maliciously, if you would like to revoke Coverify's permissions,
            you can visit {" "}
            <a href="http://www.spotify.com/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427">your apps page</a> your apps page and click "REMOVE ACCESS" on Coverify. {" "}
            <a href="https://support.spotify.com/us/article/spotify-on-other-apps/">Here</a> is a more detailed guide for doing so.
        </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
