import React from "react";

const GeniusSearch = ({ songKeyword, setSongKeyword, searchKeyword, error }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={songKeyword}
        onChange={(e) => setSongKeyword(e.target.value)}
        placeholder="Enter song title"
        className="input"
      />
      <button onClick={searchKeyword} className="button">Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GeniusSearch;
