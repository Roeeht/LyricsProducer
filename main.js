const axios = require("axios");

const accessToken =
  "ROTIrmBnGpGQYEO3dUDizWL5u3altbhouXe8oOPS1WFY9VRdku6w4vDUf1XN6Pja"; // Replace with your actual token

// Function to search for a song by title
const searchSong = async (songTitle) => {
  try {
    const response = await axios.get(`https://api.genius.com/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songTitle,
      },
    });

    const hits = response.data.response.hits;
    if (hits.length > 0) {
      hits.map((hit) => {
        const songInfo = hit.result;
        console.log(`Title: ${songInfo.title}`);
        console.log(`Artist: ${songInfo.primary_artist.name}`);
        console.log(`URL: ${songInfo.url}`);
      });
    } else {
      console.log("No results found.");
    }
  } catch (error) {
    console.error("Error fetching data from Genius API:", error);
  }
};

// Example usage
searchSong("Don't kill my vibe"); // Replace with the title of the song you want to search for
