const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/router");

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

// CORS Middleware Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or CURL requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // This allows cookies to be sent cross-origin
  })
);

// Middleware to handle JSON payloads and cookies
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API Routes
app.use("/api", router);

// Root route for basic health check
app.get("/", (req, res) => {
  res.send("API is running...!");
});

// Port Configuration
const PORT = process.env.PORT || 8080;

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running on port " + PORT);
  });
});
