const express = require("express");
const cors = require("cors");
const path = require("path");

const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve generated images
app.use(
  "/generated-images",
  express.static(path.join(__dirname, "generated-images"))
);

// Routes
app.use("/api/jobs", jobRoutes);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully!",
  });
});

module.exports = app;