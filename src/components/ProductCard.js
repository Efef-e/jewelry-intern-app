import React, { useState } from "react";

const colorOptions = [
  { key: "yellow", label: "Yellow Gold", color: "#E6CA97" },
  { key: "white", label: "White Gold", color: "#D9D9D9" },
  { key: "rose", label: "Rose Gold", color: "#E1A4A9" },
];

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] =
    useState("yellow");
  const popularity = (product.popularityScore * 5).toFixed(
    1
  );

  return (
    <div className="product-card">
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        className="product-img"
      />
      <div className="product-info">
        <div className="product-title">{product.name}</div>
        <div className="product-price">
          ${product.price} USD
        </div>
        <div className="color-picker">
          {colorOptions.map((opt) => (
            <span
              key={opt.key}
              className={`color-dot${
                selectedColor === opt.key ? " selected" : ""
              }`}
              style={{ background: opt.color }}
              onClick={() => setSelectedColor(opt.key)}
            />
          ))}
        </div>
        <div className="color-label">
          {
            colorOptions.find(
              (opt) => opt.key === selectedColor
            ).label
          }
        </div>
        <div className="popularity">
          <span className="stars">
            {"★".repeat(Math.round(popularity))}
            {"☆".repeat(5 - Math.round(popularity))}
          </span>
          <span className="score">{popularity}/5</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
