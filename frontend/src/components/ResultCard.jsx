function ResultCard({ result }) {
  return (
    <div className="result-card">

      <div className="success-box">
        ✅ Content generated successfully!
      </div>

      <h2>Generated Result</h2>

      <div className="status">
        {result.status}
      </div>

      <div className="images">

        <div>
          <h3>Original Image</h3>

          <img
            src={`http://localhost:5000/uploads/${result.originalImage}`}
            alt="Original"
          />
        </div>

        <div>
          <h3>Generated Image</h3>

          <img
            src={`http://localhost:5000${result.generatedImage}`}
            alt="Generated"
          />
        </div>

      </div>

      <h3>Generated Prompt</h3>

      <div className="prompt-box">
        {result.prompt}
      </div>

    </div>
  );
}

export default ResultCard;