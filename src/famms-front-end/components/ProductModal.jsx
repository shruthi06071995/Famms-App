import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

function ProductModal({ show, handleClose, product, onAddToCart }) {

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Product Details
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {product && (

                    <Row>

                        <Col md={5}>

                            <img
                                src={
                                    product.image.startsWith("http")
                                        ? product.image
                                        : `/${product.image}`
                                }
                                alt={product.title}
                                className="img-fluid"
                            />

                        </Col>

                        <Col md={7}>
                            <h4>{product.title}</h4>
                            <p>
                                <strong>Category:</strong>{" "}
                                {
                                    product.category.charAt(0).toUpperCase() +
                                    product.category.slice(1)
                                }
                            </p>

                            <h5>
                                <strong>Price:</strong>  ₹{product.price}
                            </h5>

                            <p>
                                <strong>Stock:</strong> {product.countInStock}
                            </p>

                            <p>
                                <strong>Description</strong>
                            </p>

                            <p>{product.description || "No Product Description Avaliable"}</p>

                            <div className="d-flex align-items-center gap-2 mt-3">

                                <strong>Quantity:</strong>

                                <Button
                                    variant="outline-secondary"
                                    onClick={decreaseQuantity}
                                    disabled={quantity === 1}
                                >
                                    -
                                </Button>

                                <span className="fs-5 fw-bold">{quantity}</span>

                                <Button
                                    variant="outline-secondary"
                                    onClick={increaseQuantity}
                                    disabled={quantity >= product.countInStock}
                                >
                                    +
                                </Button>
                            </div>

                            <div className="mt-4">
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        onAddToCart(product, quantity);
                                        handleClose();
                                    }}
                                >
                                    {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
                                </Button>
                            </div>

                        </Col>

                    </Row>

                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;