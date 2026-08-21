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

import { Route, Routes } from "react-router-dom";
import ProductDetails from "./famms-front-end/products/ProductDetails";
import AddProduct from "./famms-front-end/admin/AddProduct";
import ProtectedRoute from "./famms-front-end/components/ProtectedRoute";
import { useEffect, useState } from "react";
import EditProduct from "./famms-front-end/admin/EditProduct"
import Checkout from "./famms-front-end/pages/Checkout";
import Orders from "./famms-front-end/admin/Orders";
import MyOrders from "./famms-front-end/pages/MyOrders";
import UserProtectedRoute from "./famms-front-end/components/UserProtectedRoute";
import Profile from "./famms-front-end/profile/Profile";
import Wishlist from "./famms-front-end/wishlist/Wishlist";
import Dashboard from "./famms-front-end/admin/Dashboard";
import adminProducts from "./famms-front-end/admin/adminProducts";
import Users from "./famms-front-end/admin/Users";
import AdminProducts from "./famms-front-end/admin/adminProducts";


function App() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {

    fetchProducts();
  }, []);

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

      setProducts([]);
      setProductsError(error.message || "Failed to load products");

    } finally {

      setProductsLoading(false);

    }
  };


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
              fetchProducts={fetchProducts}
            />
          }
        />

        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search
          products={products}
          productsLoading={productsLoading}
          productsError={productsError}
        />
        }
        />

        {/* Protected Route  */}
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct fetchProducts={fetchProducts} />
            </ProtectedRoute>
          }
        />

        {/* Move this here  */}
        <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedRoute>

              <EditProduct fetchProducts={fetchProducts} />

            </ProtectedRoute>
          }

        />

        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <UserProtectedRoute>
              <Wishlist />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myorders"
          element={
            <UserProtectedRoute>
              <MyOrders />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Full />
    </>
  );
}

export default App;
