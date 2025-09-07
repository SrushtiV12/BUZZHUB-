import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import path from "path"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import geminiRouter from "./routes/gemini.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

//middleware
if(process.env.NODE_ENV !== "production"){
  app.use(cors());
}

app.use(express.json());

app.use("/api/gemini", rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: "Too many requests. Please try again later.",
}));

app.get("/", (req, res) => {
  res.send("Welcome! BuzzHub Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", rateLimiter, eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.use("/api/gemini", geminiRouter);

const __dirname = path.resolve();

console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "Yes ✅" : "No ❌");

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});
};

const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("Serving frontend from:", frontendPath);


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});