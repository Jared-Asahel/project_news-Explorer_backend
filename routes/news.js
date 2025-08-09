const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/news", async (req, res) => {
  const { q, from, to } = req.query;
  const API_KEY =
    process.env.NEWS_API_KEY || "f360b17499654bb8994fd5053c2fcd03";

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q,
        from,
        to,
        pageSize: 100,
        apiKey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error al consultar NewsAPI:", error.message);
    res.status(500).json({ message: "Error al consultar NewsAPI" });
  }
});

module.exports = router;
