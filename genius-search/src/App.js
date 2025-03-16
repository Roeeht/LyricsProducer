import "./App.css";
import React, { useState } from "react";
import FetchGenius from "./components/FetchGenius";
import ResultList from "./components/ResultList";

function App() {
  const [results, setResults] = useState([])

  return (
    <div>
      <FetchGenius onResultsFetched={setResults} />
      <ResultList results={results}/>
    </div>
  );
}

export default App;
