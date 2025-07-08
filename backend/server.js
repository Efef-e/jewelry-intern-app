const express = require("express");
const cors = require("cors");
const path = require("path");
const products = require("./products.json");
const app = express();
const PORT = process.env.PORT || 10000;
const axios = require("axios");

app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

async function getGoldPrice() {
  try {
    const apiKey = "YOUR_METALS_API_KEY";
    const url = `https://metals-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=XAU`;
    const response = await axios.get(url);
    const pricePerOunce = response.data.rates.XAU;
    const pricePerGram = pricePerOunce / 31.1035;
    return pricePerGram;
  } catch (error) {
    console.error(
      "Could not get gold price:",
      error.message
    );
    return 70;
  }
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

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build", "index.html")
  );
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
