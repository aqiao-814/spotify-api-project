const express = require("express");
const cors = require("cors");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = 8008;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve static files from the "build" folder inside the "client" folder
app.use(express.static(path.join(__dirname, "client/build")));

// Route to handle OpenAI API requests
app.post("/api/generate-images", async (req, res) => {
  const { prompt, count } = req.body;

  try {
    const response = await openai.images.generate({
      prompt,
      n: count,
    });

    const imageUrls = response.data.map((item) => item.url);
    res.json({ imageUrls });
  } catch (error) {
    console.error("Error generating images:", error);
    res.status(500).json({ error: "Failed to generate images" });
  }
});

// Fallback to serve React app for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
