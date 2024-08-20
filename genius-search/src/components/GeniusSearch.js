import React, { useState } from "react";
import axios from "axios";

const GeniusSearch = () => {
  const [songTitle, setSongTitle] = useState("");
  const [results, setResults] = useState([]);

  const accessToken =
    "HE0eFWG2Y_V3Kh4ws6rc5su2jbiKJBpQiTChewkij-gxxVfjd4nfzbjX3jBg_RVQ"; // Replace with your actual token

  const searchSong = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/genius/search`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: songTitle,
          },
        }
      );

      const hits = response.data.response.hits;
      if (hits.length > 0) {
        setResults(
          hits.map((hit) => ({
            title: hit.result.title,
            artist: hit.result.primary_artist.name,
            url: hit.result.url,
          }))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data from Genius API:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Genius Song Search</h1>
      <input
        type="text"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        placeholder="Enter song title"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={searchSong} style={{ padding: "10px 20px" }}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Title:</strong> {result.title} <br />
                <strong>Artist:</strong> {result.artist} <br />
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  View on Genius
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default GeniusSearch;
