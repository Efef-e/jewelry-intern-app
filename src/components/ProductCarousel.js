import React from "react";
import ProductCard from "./ProductCard";
import "./ProductCarousel.css";

function ProductCarousel({ products }) {
  const repeatedProducts = [
    ...products,
    ...products,
    ...products,
  ];

  return (
    <div className="product-scroll-container">
      {repeatedProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default ProductCarousel;
