import "./App.css";
import { useEffect, useState } from "react";
import Home from "./home/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Testimonial from "./pages/Testimonial";
import Products from "./products/Products";
import Blog from "./blog/Blog";
import Contact from "./contact/Contact";
import Cart from "./cart-items/Cart";
import Search from "./search/Search";
import Header from "./components/Header";
import Full from "./footer/Full";
import productsData from "./data/productsData";

function App() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError("");

        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts(productsData);
        setProductsError(error.message || "Failed to load products");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              productsLoading={productsLoading}
              productsError={productsError}
            />
          }
        />

        {/* Nested Route */}
        <Route path="/pages">
          <Route path="about" element={<About />} />
          <Route path="testimonial" element={<Testimonial />} />
        </Route>

        <Route
          path="/products"
          element={
            <Products
              products={products}
              productsLoading={productsLoading}
              productsError={productsError}
            />
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/search"
          element={
            <Search
              products={products}
              productsLoading={productsLoading}
              productsError={productsError}
            />
          }
        />
      </Routes>
      <Full />
    </>
  );
}

export default App;
