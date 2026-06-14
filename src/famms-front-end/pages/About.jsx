import { Container, Card, Col, Row } from "react-bootstrap";
import '../pages/pages.css'
import '../home/Home.css'
import truck from '../../assets/truck.png'
import free from '../../assets/free.png'
import award from '../../assets/reward.png'
import arrival from '../../assets/arrival.png'

function About() {
    return (
        <>
            <h1 className="heading">About Us</h1>
            <section className="about-section">
                <Container>
                    <h2 className="section-title"><b>Why Shop With Us</b></h2>
                    <div className="underline"></div>
                    <Row className="about-row">
                        <Col xl={4} lg={4} md={6} sm={12}>
                            <Card className="h-100" >
                                <Card.Body className="about-card" >
                                    <img src={truck} alt="icon tuck" className="icon-img" />
                                    <Card.Title><b>Fast Delivery</b></Card.Title>
                                    <Card.Text>
                                        variations of passages of Lorem
                                        Ipsum available
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12}>
                            <Card className="h-100" >
                                <Card.Body className="about-card">
                                    <img src={free} alt="icon tuck" className="icon-img" />
                                    <Card.Title><b>Free Shipping</b></Card.Title>
                                    <Card.Text>
                                        variations of passages of Lorem
                                        Ipsum available
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12}>
                            <Card className="h-100" >
                                <Card.Body className="about-card">
                                    <img src={award} alt="icon tuck" className="icon-img" />
                                    <Card.Title><b>Best Quality</b></Card.Title>
                                    <Card.Text>
                                        variations of passages of Lorem
                                        Ipsum available
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Arrival Section  */}
            <section className="arrival-section">
                <Container>
                    <Row className="align-items-center arrival-row">

                        <Col md={7} className="arrival-img">
                            <img
                                src={arrival}
                                alt="arrival"
                                className="img-fluid"
                            />
                        </Col>

                        <Col md={5} className="arrival-content">
                            <h1>#NewArrivals</h1>

                            <p>
                                Vitae fugiat laboriosam officia perferendis provident
                                aliquid voluptatibus dolorem...
                            </p>

                            <button className="shop-btn">
                                Shop Now
                            </button>
                        </Col>

                    </Row>
                </Container>
            </section>
            {/* Arrival Section ends  */}
        </>
    );
}

export default About;