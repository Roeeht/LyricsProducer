import React, { useState } from "react";
import Result from "./Result";
import axios from "axios";
import "./GeniusSearch.css";

const GeniusSearch = () => {
  const [songKeyword, setSongKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(""); // New state for handling empty input errors

  const accessToken =
    "HE0eFWG2Y_V3Kh4ws6rc5su2jbiKJBpQiTChewkij-gxxVfjd4nfzbjX3jBg_RVQ"; // Replace with your actual token

  const searchKeyword = async () => {
    if (songKeyword.trim() === "") {
      setError("Please enter a keyword"); // Set error if input is empty
      return;
    }
    setError(""); // Clear error if input is valid

    try {
      const hits = await fetchGeniusSearchResults(songKeyword, accessToken);
      const processedResults = processSearchResults(hits);
      setResults(processedResults);
    } catch (error) {
      console.error("Error occurred during song search:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Genius Song Search</h1>
      <div className="input-container">
        <input
          type="text"
          value={songKeyword}
          onChange={(e) => setSongKeyword(e.target.value)}
          placeholder="Enter song title"
          className="input"
          required
        />
        <button onClick={searchKeyword} className="button">
          Search
        </button>{" "}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="results">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <Result
                key={index}
                title={result.title}
                artist={result.artist}
                result={result}
              />
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

const fetchGeniusSearchResults = async (songKeyword, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/genius/search`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: songKeyword,
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
