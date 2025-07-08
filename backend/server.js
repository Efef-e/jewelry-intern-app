const express = require("express");
const cors = require("cors");
const path = require("path");
const products = require("./products.json");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

async function getGoldPrice() {
  return 70;
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
