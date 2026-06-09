import Home from "./famms-front-end/home/Home";
import About from "./famms-front-end/pages/About";
import Testimonial from "./famms-front-end/pages/Testimonial";
import Products from "./famms-front-end/products/Products";
import Blog from "./famms-front-end/blog/Blog";
import Contact from "./famms-front-end/contact/Contact";
import Cart from "./famms-front-end/cart-items/Cart";
import Search from "./famms-front-end/search/Search";
import Header from "./famms-front-end/components/Header";
import Full from "./famms-front-end/footer/Full";
import Login from "./famms-front-end/add-on/Login";

import productsData from "./famms-back-end/data/productsData";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./famms-front-end/products/ProductDetails";
import { useEffect, useState } from "react";


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
        <Route path="/login" element={<Login />} />

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
        <Route path="/products/:id" element={<ProductDetails />} />
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
