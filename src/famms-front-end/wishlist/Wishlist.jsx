import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { useNavigate } from "react-router-dom";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const { data } = await axios.get(
                "http://localhost:5000/api/users/wishlist",
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            setWishlist(data);

        } catch (error) {

            console.log(error);

        }

    };

    const removeWishlist = async (id) => {

        try {

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            await axios.delete(
                `http://localhost:5000/api/users/wishlist/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            fetchWishlist();

            window.dispatchEvent(new Event("wishlistUpdated"));

        } catch (error) {

            console.log(error);

        }

    };

    const addWishlistToCart = async (product) => {

        dispatch(addToCart(product, 1));

        await removeWishlist(product._id);

        alert("Product added to cart");

    };

    const buyNow = async (product) => {

        dispatch(addToCart(product, 1));

        await removeWishlist(product._id);

        navigate("/checkout");

    };

    return (

        <div className="container py-5">

            <h2 className="text-center mb-5">
                My Wishlist
            </h2>

            {wishlist.length === 0 ? (

                <p className="text-center">
                    No products in wishlist.
                </p>

            ) : (

                <Row>

                    {wishlist.map((product) => (

                        <Col md={4} className="mb-4" key={product._id}>

                            <Card>

                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ height: "250px", objectFit: "contain" }}
                                />

                                <Card.Body>

                                    <h5>{product.title}</h5>

                                    <h6>₹ {product.price}</h6>

                                    <div className="d-grid gap-2">

                                        <Button
                                            variant="success"
                                            onClick={() => addWishlistToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>

                                        <Button
                                            variant="warning"
                                            onClick={() => buyNow(product)}
                                        >
                                            Buy Now
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => removeWishlist(product._id)}
                                        >
                                            Remove
                                        </Button>

                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

            )}

        </div>

    );

}

export default Wishlist;