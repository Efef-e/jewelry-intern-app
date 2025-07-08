import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCarousel from "./components/ProductCarousel";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://jewelry-intern-app-production-146f.up.railway.app/api/products"
      )
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h2 className="product-list-title">Product List</h2>
      <ProductCarousel products={products} />
    </div>
  );
}

export default App;
