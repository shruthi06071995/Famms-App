import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import toast from "react-hot-toast";

function ProductDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productsData, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/products`)
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    const product = productsData.find(
        (item) => item._id === id || item.id === id
    );

    const handleAddToCart = () => {

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

        if (!userInfo) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        dispatch(addToCart(product, 1));
    };

    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <Container className="mt-5">
            <Row>

                <Col md={6}>

                    <img
                        src={
                            product.image
                                ? product.image.startsWith("http")
                                    ? product.image
                                    : `/${product.image}`
                                : "/placeholder.png"
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