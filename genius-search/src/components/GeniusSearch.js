import React, { useState } from "react";
import axios from "axios";
import "./GeniusSearch.css";

const GeniusSearch = () => {
  const [songTitle, setSongTitle] = useState("");
  const [results, setResults] = useState([]);
  const accessToken =
    "HE0eFWG2Y_V3Kh4ws6rc5su2jbiKJBpQiTChewkij-gxxVfjd4nfzbjX3jBg_RVQ"; // Replace with your actual token

  const searchSong = async () => {
    try {
      const hits = await fetchGeniusSearchResults(songTitle, accessToken);
      const processedResults = processSearchResults(hits);
      setResults(processedResults);
    } catch (error) {
      console.error("Error occurred during song search:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Genius Song Search</h1>
      <input
        type="text"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        placeholder="Enter song title"
        className="input"
      />
      <button onClick={searchSong} className="button">
        Search
      </button>

      <div className="results">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index} className="results-item">
                <span className="result-title">Title:</span> {result.title}{" "}
                <br />
                <span className="result-artist">Artist:</span> {result.artist}{" "}
                <br />
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-link"
                >
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

const fetchGeniusSearchResults = async (songTitle, accessToken) => {
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
    return response.data.response.hits;
  } catch (error) {
    console.error("Error fetching data from Genius API:", error);
    throw error;
  }
};

const processSearchResults = (hits) => {
  if (hits.length > 0) {
    return hits.map((hit) => ({
      title: hit.result.title,
      artist: hit.result.primary_artist.name,
      url: hit.result.url,
    }));
  } else {
    return [];
  }
};

export default GeniusSearch;
