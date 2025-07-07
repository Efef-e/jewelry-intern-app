const express = require("express");
const cors = require("cors");
const axios = require("axios");
const products = require("./products.json");
const app = express();
const PORT = 5000;

app.use(cors());

async function getGoldPrice() {
  const apiKey = "goldapi-API-ANAHTARIN";
  const url = "https://www.goldapi.io/api/XAU/USD";
  const { data } = await axios.get(url, {
    headers: { "x-access-token": apiKey },
  });

  return data.price / 31.1035;
}

app.get("/api/products", async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();
    let result = products.map((p) => {
      const price = (
        (p.popularityScore + 1) *
        p.weight *
        goldPrice
      ).toFixed(2);
      return { ...p, price: Number(price) };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Could not get gold price or products.",
    });
  }
});

app.listen(PORT, () =>
  console.log(`Backend http://localhost:${PORT} working.`)
);
