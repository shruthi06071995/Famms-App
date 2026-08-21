import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        setFormData({
            name: userInfo?.name || "",
            email: userInfo?.email || "",
            phone: userInfo?.phone || "",
            address: userInfo?.address || "",
            city: userInfo?.city || "",
            state: userInfo?.state || "",
            pincode: userInfo?.pincode || "",
        });

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            navigate("/products");
            return;
        }

        try {

            console.log("Cart Items:", cartItems);
            console.log("Total Price:", totalPrice);

            const profileResponse = await fetch(
                "http://localhost:5000/api/users/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                    body: JSON.stringify({
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode,
                    }),
                }
            );

            const profileData = await profileResponse.json();

            console.log("Profile Update:", profileData);

            if (!profileResponse.ok) {
                alert(profileData.message);
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },

                    body: JSON.stringify({

                        orderItems: cartItems.map((item) => ({
                            product: item._id,
                            name: item.title,
                            image: item.image,
                            price: item.price,
                            quantity: item.quantity,
                        })),

                        shippingAddress: {
                            fullName: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.address,
                            city: formData.city,
                            state: formData.state,
                            pincode: formData.pincode,
                        },

                        totalPrice,

                    }),

                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Order Placed Successfully");

                dispatch({
                    type: "CLEAR_CART",
                });

                navigate("/");

            } else {

                alert(data.message);

            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (

        <Container className="my-5">

            <h2 className="text-center mb-4">
                Checkout
            </h2>

            <Form onSubmit={handleSubmit}>

                <Row>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>

                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Address</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                </Form.Group>

                <Row>

                    <Col md={4}>

                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>

                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                    </Col>

                    <Col md={4}>

                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>

                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                    </Col>

                    <Col md={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Pincode</Form.Label>

                            <Form.Control
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>

                    </Col>

                </Row>

                <Button
                    variant="danger"
                    type="submit"
                >
                    Place Order
                </Button>

            </Form>

        </Container>

    );

}

export default Checkout;