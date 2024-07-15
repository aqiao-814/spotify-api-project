import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AndyImage from "../assets/images/Andy.png";
import LitaoImage from "../assets/images/Litao.png";
import MichelleImage from "../assets/images/Michelle.png";
import StephanieImage from "../assets/images/Stephanie.png";

const developers = [
  { name: "Andy Qiao", image: AndyImage },
  { name: "Litao Li", image: LitaoImage },
  { name: "Michelle Shin", image: MichelleImage },
  { name: "Stephanie Hsing", image: StephanieImage },
];

const About = () => {
  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "150px", marginBottom: "250px" }}
    >
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography paragraph>
        Hi! We are Andy Qiao, Litao Li, Michelle Shin, and Stephanie Hsing. We
        made Coverify as sophomores at the University of Illinois
        Urbana-Champaign for a class project. In a world increasingly shaped by
        artificial intelligence, we decided to incorporate AI into our project,
        and DALL·E caught our attention.
      </Typography>
      <Typography paragraph>
        The Coverify project is a user-friendly Spotify playlist cover generator
        designed to enhance the playlist customization experience. Users can
        generate unique cover images based on playlist data. Coverify is a
        result of our dedication and collaborative efforts, and we hope you
        enjoy exploring the intersection of creativity and technology through
        our platform.
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={9}>
        {developers.map((developer, index) => (
          <Grid item key={index}>
            <div style={{ textAlign: "center" }}>
              <img
                src={developer.image}
                alt={developer.name}
                style={{
                  width: "150px",
                  height: "270px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="caption" display="block" align="center">
                {developer.name}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
