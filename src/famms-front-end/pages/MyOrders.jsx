import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Badge } from "react-bootstrap";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const { data } = await axios.get(
                "http://localhost:5000/api/orders/myorders",
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            setOrders(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Container className="py-5">

            <h2 className="text-center mb-5">
                My Orders
            </h2>

            {orders.length === 0 ? (

                <h5 className="text-center">
                    No Orders Found
                </h5>

            ) : (

                orders.map((order) => (

                    <Card className="mb-4" key={order._id}>

                        <Card.Body>

                            <h5>
                                Order ID :
                                {" "}
                                {order._id}
                            </h5>

                            <p>
                                <strong>Date :</strong>{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Total :</strong> ₹ {order.totalPrice}
                            </p>

                            <p>

                                <strong>Status :</strong>

                                {" "}

                                {order.isDelivered ? (

                                    <Badge bg="success">
                                        Delivered
                                    </Badge>

                                ) : (

                                    <Badge bg="warning">
                                        Pending
                                    </Badge>

                                )}

                            </p>

                            <hr />

                            {order.orderItems.map((item) => (

                                <div
                                    key={item.product}
                                    className="d-flex align-items-center mb-3"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width="80"
                                    />

                                    <div className="ms-3">

                                        <h6>{item.name}</h6>

                                        <p>
                                            Qty : {item.quantity}
                                        </p>

                                        <p>
                                            ₹ {item.price}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </Card.Body>

                    </Card>

                ))

            )}

        </Container>

    );

}

export default MyOrders;