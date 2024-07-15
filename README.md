# Coverify Project

## Introduction

The Coverify project is a user-friendly Spotify playlist cover generator designed to enhance the playlist customization experience. Users can personalize their playlists by generating unique cover images based on our WIP prompt algorithm.

- This project uses OpenAI's DALL-E API to generate images based on user prompts. Please note that using DALL-E is a paid feature, and you must ensure your OpenAI account has sufficient credits. We are actively working on switching to a free version in the future.

### The Team
- [@aqiao-814](https://github.com/aqiao-814)
- [@shsing2](https://github.com/shsing2)
- [@lli205](https://github.com/lli205)
- [@michelleshin34](https://github.com/michelleshin34)

## Demo



https://github.com/user-attachments/assets/4ef9dc4c-d750-4df3-b0ce-8eab215a3b27



## Usage Instructions

1. **Set Up the Server**

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Create a `.env` file with the following content:
     ```env
     OPENAI_API_KEY="sk-*"
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

2. **Set Up the Client**
   - Navigate to the `client` directory:
     ```bash
     cd client
     ```
   - Create a `.env` file with the following content:
     ```env
     REACT_APP_SPOTIFY_CLIENT_ID='b50d31cafcd44db882e0e7016d314103'
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Build the client:
     ```bash
     npm run build
     ```
   - Start the client:
     ```bash
     npm start
     ```
