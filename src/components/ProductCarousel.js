import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import "./ProductCarousel.css";

function ProductCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const repeatedProducts = [
    ...products,
    ...products,
    ...products,
  ];

  return (
    <div className="carousel-wrapper">
      <button
        className="scroll-button scroll-left"
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
      ></button>
      <div
        className="product-scroll-container"
        ref={scrollRef}
      >
        {repeatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button
        className="scroll-button scroll-right"
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
      ></button>
    </div>
  );
}

export default ProductCarousel;
