import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3000;

// Enable CORS so frontend can call backend
app.use(cors());

// Proxy for search
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Proxy for movie details
app.get("/api/details/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${movieId}&plot=full`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching details" });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
