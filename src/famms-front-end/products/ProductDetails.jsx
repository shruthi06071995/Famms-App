import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

function ProductDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productsData, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [id]);

    const product = productsData.find(
        (item) => item._id === id
    );

    const handleAddToCart = () => {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        dispatch(addToCart(product, 1));
    };

    if (!product) {
        return <h2>Loading...</h2>;
    }

    console.log(product);
    console.log(product.image);

    return (
        <Container className="mt-5">
            <Row>

                <Col md={6}>

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

                <Col md={6}>
                    <h2>{product.title}</h2>

                    <h3>₹ {product.price}</h3>

                    <p>{product.description}</p>

                    <Button variant="danger" onClick={handleAddToCart}>
                        Add To Cart
                    </Button>
                </Col>

            </Row>
        </Container>
    );
}

export default ProductDetails;