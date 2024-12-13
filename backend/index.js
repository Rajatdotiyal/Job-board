const express = require("express");
const userRouter = require("./Routes/userRouter");
const jobRouter = require("./Routes/jobRouter");
const appRouter = require("./Routes/appRouter");
const cors = require("cors");

const app = express();

// Replace this with your actual frontend URL on Vercel
const frontendUrl = "https://job-board-pmj3.vercel.app/"; // Change this

// Middleware for handling CORS
app.use(
  cors({
    origin: frontendUrl,  // Allow requests only from the frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow headers
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Define your routes  
app.use("/api/v1/user",  userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/app", appRouter);

// Handle preflight OPTIONS requests
app.options("*", cors());

// Error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);  // Delegate to the default error handler
  }
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
module.exports = app;

