import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import { FaShoppingCart, FaBolt, FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ProductCard({ product, fetchProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productName = product?.title || product?.name || "Product";
  const [showModal, setShowModal] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  const handleAddToCart = (product, quantity, e) => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo")|| "null");

    if (!userInfo) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    animateToCart(e);
    dispatch(addToCart(product, quantity));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleBuyNow = () => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product, 1));
    navigate("/cart");

  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {

        toast.success("Product Deleted Successfully");

        fetchProducts();

      } else {

        alert(data.message);

      }

    } catch (error) {

      toast.error("Something went wrong");

    }

  };

  const addToWishlist = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

      if (!userInfo) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Added to Wishlist ❤️");

      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const animateToCart = (e) => {
    const cart = document.getElementById("cart-icon");
    const img = e.currentTarget.closest(".product-card").querySelector("img");

    if (!cart || !img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = img.cloneNode(true);

    flyingImg.style.position = "fixed";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.zIndex = 1000;
    flyingImg.style.transition = "all 0.8s ease-in-out";
    flyingImg.style.borderRadius = "10px";

    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.width = "30px";
      flyingImg.style.height = "30px";
      flyingImg.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
      document.body.removeChild(flyingImg);
    }, 800);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ cursor: "pointer" }}
      >
        <Card
          className="product-card h-100"
          onClick={handleOpenModal}
        >
          <div className="img-wrapper position-relative">

            {product.countInStock === 0 && (
              <span className="stock-badge">
                OUT OF STOCK
              </span>
            )}


            <motion.img
              variant="top"
              src={
                product.image?.startsWith("http")
                  ? product.image
                  : `/${product.image}`
              }
              alt={productName}
              className="card-img-top"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="overlay">

              <motion.button
                className="icon-btn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product, 1, e)
                }}
                title="Add to Cart"
                disabled={product.countInStock === 0}
              >
                <FaShoppingCart />
              </motion.button>

              <motion.button
                className="btn btn-outline-danger ms-2"
                whileTap={{ scale: 1.4 }}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(product._id);
                }}
              >
                <FaRegHeart />
              </motion.button>

              <motion.button
                className="icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow();
                }}
                title="Buy Now"
                disabled={product.countInStock === 0}
              >
                <FaBolt />
              </motion.button>

              {userInfo?.role === "admin" && (

                <motion.button
                  className="icon-btn"
                  title="Edit Product"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/edit-product/${product._id}`);
                  }}
                >

                  <FaEdit />

                </motion.button>
              )}

              {userInfo?.role === "admin" && (
                <motion.button
                  className="icon-btn"
                  variant="danger"
                  title="Delete Product"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  <FaTrash />
                </motion.button>
              )}

            </div>

          </div>

          <Card.Body className="text-center">
            <Link
              to={`/products/${product._id}`}
              className="text-decoration-none text-dark"
            >
              <h5 className="text-truncate">{productName}</h5>
            </Link>
            <h6>Rs. {product.price}</h6>
          </Card.Body>
        </Card>
      </motion.div>

      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        product={product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default ProductCard;
