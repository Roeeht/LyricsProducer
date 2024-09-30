// Result.js
import React from "react";

const Result = ({ title, artist, result }) => {
  return (
    <div className="result-item">
      <h3>{title}</h3>
      <p>{artist}</p>
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="result-link"
      >
        View on Genius
      </a>
    </div>
  );
};

export default Result;
