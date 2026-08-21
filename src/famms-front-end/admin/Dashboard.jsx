import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0,
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const products = await axios.get(
                "http://localhost:5000/api/products"
            );

            const orders = await axios.get(
                "http://localhost:5000/api/orders",
                config
            );

            const users = await axios.get(
                "http://localhost:5000/api/users",
                config
            );

            const revenue = orders.data.reduce(
                (total, order) => total + order.totalPrice,
                0
            );

            setDashboard({
                products: products.data.length,
                orders: orders.data.length,
                users: users.data.length,
                revenue,
            });

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Container className="py-5">

            <h1 className="text-center mb-5">
                Admin Dashboard
            </h1>

            <Row>

                <Col md={3}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <h3>Products</h3>
                            <h1>{dashboard.products}</h1>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <h3>Orders</h3>
                            <h1>{dashboard.orders}</h1>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <h3>Users</h3>
                            <h1>{dashboard.users}</h1>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <h3>Revenue</h3>
                            <h1>₹ {dashboard.revenue}</h1>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        </Container>

    );

}

export default Dashboard;