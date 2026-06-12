import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function ProductDetails() {

    const { id } = useParams();

    const [productsData, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const product = productsData.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <Container className="mt-5">
            <Row>

                <Col md={6}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid"
                    />
                </Col>

                <Col md={6}>
                    <h2>{product.title}</h2>

                    <h3>₹ {product.price}</h3>

                    <p>{product.description}</p>

                    <Button variant="danger">
                        Add To Cart
                    </Button>
                </Col>

            </Row>
        </Container>
    );
}

export default ProductDetails;