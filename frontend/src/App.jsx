import UploadForm from "./components/UploadForm";

function App() {
  return (
    <div className="container">

      <h1 className="title">
        Mini Content Engine
      </h1>

      <p className="subtitle">
        AI Powered Product Image Generator
      </p>

      <div className="card">
        <UploadForm />
      </div>

      <div className="footer">
        Built using React • Express • Prisma • PostgreSQL
      </div>

    </div>
  );
}

export default App;