import Result from "./Result";
import "./GeniusSearch.css";

const ResultList = ({ results }) => {
  return (
    <div className="results">
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <Result key={index} title={result.title} artist={result.artist} result={result} />
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultList;
