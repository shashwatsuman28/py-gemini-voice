import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 👈 import cors
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // load .env

const app = express();
app.use(express.json());

// ✅ Allow requests from your React frontend
app.use(cors({
  origin: "http://localhost:8080",  // frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Debug: check if key is being read
console.log("Gemini API Key loaded?", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Debug: log request message
    console.log("Incoming message:", message);

    const result = await model.generateContent(message);

    // Debug: log Gemini response
    console.log("Gemini reply:", result.response.text());

    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
