import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import { FaShoppingCart, FaBolt, FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

function ProductCard({ product, fetchProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productName = product?.title || product?.name || "Product";
  const [showModal, setShowModal] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleAddToCart = (product, quantity) => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product, quantity));
  };

  const handleBuyNow = () => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first");
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

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {

      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Product Deleted Successfully");

        fetchProducts();

      } else {

        alert(data.message);

      }

    } catch (error) {

      alert("Something went wrong");

    }

  };

  const addToWishlist = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        alert("Please login first");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/users/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Added to Wishlist ❤️");

      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Card className="product-card h-100"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModal}
      >
        <div className="img-wrapper position-relative">

          {product.countInStock === 0 && (
            <span className="stock-badge">
              OUT OF STOCK
            </span>
          )}

          <Card.Img
            variant="top"
            src={
              product.image?.startsWith("http")
                ? product.image
                : `/${product.image}`
            }
          />

          <div className="overlay">

            <Button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product, 1)
              }}
              title="Add to Cart"
              disabled={product.countInStock === 0}
            >
              <FaShoppingCart />
            </Button>

            <Button
              className="btn btn-outline-danger ms-2"
              onClick={(e) => {
                e.stopPropagation();
                addToWishlist(product._id);
              }}
            >
              <FaRegHeart />
            </Button>

            <Button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow();
              }}
              title="Buy Now"
              disabled={product.countInStock === 0}
            >
              <FaBolt />
            </Button>

            {userInfo?.role === "admin" && (

              <Button
                className="icon-btn"
                title="Edit Product"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/edit-product/${product._id}`);
                }}
              >

                <FaEdit />

              </Button>
            )}

            {userInfo?.role === "admin" && (
              <Button
                className="icon-btn"
                variant="danger"
                title="Delete Product"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <FaTrash />
              </Button>
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
