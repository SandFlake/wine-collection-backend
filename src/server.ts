import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import winemakerRoutes from "./routes/winemakerRoutes";
import wineBottleRoutes from "./routes/wineBottleRoutes";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is up and running!" });
});

// Routes
app.use("/winemakers", winemakerRoutes);
app.use("/bottles", wineBottleRoutes);

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
