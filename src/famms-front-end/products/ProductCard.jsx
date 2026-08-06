import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productName = product.title || product.name || "Product";
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product, 1));
    navigate("/cart");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card className="product-card h-100">
        <div className="img-wrapper">
          <Link to={`/products/${product.id}`}>
            <Card.Img
              variant="top"
              src={product.image}
            />
          </Link>

          <div className="overlay">
            <Button className="btn-add-to-cart" onClick={() => handleAddToCart(product, 1)}>
              Add To Cart
            </Button>

            <br />

            <Button className="btn-add-to-cart" onClick={handleBuyNow}>
              Buy Now
            </Button>

            <br />

            <button className="btn-add-to-cart mt-2" onClick={handleOpenModal}>
              Quick View
            </button>

          </div>
        </div>

        <Card.Body className="text-center">
          <Link
            to={`/products/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <h5>{product.title}</h5>
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
