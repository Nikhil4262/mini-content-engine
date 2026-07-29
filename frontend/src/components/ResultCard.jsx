const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h2>Generated Result</h2>

      <span className="status">{result.status}</span>

      <div className="images">
        <div>
          <h3>Original Image</h3>

          <img
            src={`${BACKEND_URL}/uploads/${result.originalImage}`}
            alt="Original"
          />
        </div>

        <div>
          <h3>Generated Image</h3>

          <img
            src={`${BACKEND_URL}${result.generatedImage}?t=${Date.now()}`}
            alt="Generated"
          />
        </div>
      </div>

      <h3>Generated Prompt</h3>

      <p>{result.prompt}</p>
    </div>
  );
}

export default ResultCard;