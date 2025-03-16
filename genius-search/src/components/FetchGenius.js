import { useState } from "react";
import axios from "axios";
import GeniusSearch from "./GeniusSearch";

const FetchGenius = ({ onResultsFetched }) => {
  const [songKeyword, setSongKeyword] = useState("");
  const [error, setError] = useState("");

  const searchKeyword = async () => {
    if (songKeyword.trim() === "") {
      setError("Please enter a keyword");
      return;
    }
    setError("");

    try {
      const hits = await fetchGeniusSearchResults(songKeyword);
      const processedResults = processSearchResults(hits);

      onResultsFetched(processedResults); // ✅ Send data to parent (App.js)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <GeniusSearch
        songKeyword={songKeyword}
        setSongKeyword={setSongKeyword}
        searchKeyword={searchKeyword}
        error={error}
      />
    </div>
  );
};

// ✅ Fetch function
const fetchGeniusSearchResults = async (songKeyword) => {
  const accessToken = "HE0eFWG2Y_V3Kh4ws6rc5su2jbiKJBpQiTChewkij-gxxVfjd4nfzbjX3jBg_RVQ"; // Replace with your actual token

  try {
    const response = await axios.get(`http://localhost:5000/api/genius/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songKeyword,
      },
    });
    return response.data.response.hits;
  } catch (error) {
    console.error("Error fetching data from Genius API:", error);
    throw error;
  }
};

// ✅ Process function
const processSearchResults = (hits) => {
  return hits.map((hit) => ({
    title: hit.result.title,
    artist: hit.result.primary_artist.name,
    url: hit.result.url,
  }));
};

export default FetchGenius;





