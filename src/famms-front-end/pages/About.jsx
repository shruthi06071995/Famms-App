import { Container, Card, Col, Row } from "react-bootstrap";
import '../pages//pages.css'
import truck from '../../assets/truck.png'
import free from '../../assets/free.png'
import award from '../../assets/reward.png'

function About() {
    return (
        <>
            <h1 className="heading">About Us</h1>
            <section className="about-section">
                <Container>
                    <h2 className="section-title"><b>Why Shop With Us</b></h2>
                    <div className="underline"></div>
                    <Row className="about-row g-4">
                        <Col xl={4} lg={4} md={6} sm={12}>
                            <Card className="h-100" >
                                <Card.Body className="about-card" >
                                    <img src={truck} alt="icon tuck" className="icon-img" />
                                    <Card.Title><b>Fast Delivery</b></Card.Title>
                                    <Card.Text>
                                        Variation of passages of Lorem <br /> Ipsum avaliable
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
                                        Variation of passages of Lorem <br />Ipsum avaliable
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
                                        Variation of passages of Lorem <br /> Ipsum avaliable
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default About;