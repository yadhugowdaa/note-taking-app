import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();

// --- Database Connection ---
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    // Prevent multiple connections in serverless environment
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("✅ MongoDB Connected...");
    }
  } catch (err: any) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Export for Netlify Function (serverless) ---
export default app;

// --- Local Development Only ---
if (process.env.NETLIFY_DEV !== "true") {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
