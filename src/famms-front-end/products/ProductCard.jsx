import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productName = product.title || product.name || "Product";

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <Card className="product-card">
      <div className="img-wrapper">
        <Link to={`/products/${product.id}`}>
          <Card.Img
            variant="top"
            src={product.image}
          />
        </Link>

        <div className="overlay">
          <Button className="btn-add-to-cart" onClick={handleAddToCart}>
            Add To Cart
          </Button>
          <br />
          <Button className="btn-add-to-cart" onClick={handleBuyNow}>
            Buy Now
          </Button>
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
  );
}

export default ProductCard;
