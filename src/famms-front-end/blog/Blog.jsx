import { Container, Card, Col, Row } from "react-bootstrap";
import truck from '../../assets/truck.png';
import free from '../../assets/free.png';
import award from '../../assets/reward.png';

function Blog() {
    return (
        <>
            <h1 className="heading">Blog List</h1>
            <section className="about-section">
                <Container className="about-contain">
                    <div>
                        <div>
                            <h1><b>Why Shop With Us</b> <br />
                                <div className="underline"></div>
                            </h1>
                        </div>
                        <div>
                            <Row className="about-row">
                                <Col md={4} className="coll-card" >
                                    <Card >
                                        <Card.Body className="about-card" >
                                            <img src={truck} alt="icon tuck" className="icon-img" /><br /><br />
                                            <Card.Title><b>Fast Delivery</b></Card.Title>
                                            <Card.Text>
                                                Variation of passages of Lorem <br /> Ipsum avaliable
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <Card.Body className="about-card">
                                            <img src={free} alt="icon tuck" className="icon-img" /><br /><br />
                                            <Card.Title><b>Free Shipping</b></Card.Title>
                                            <Card.Text>
                                                Variation of passages of Lorem <br />Ipsum avaliable
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <Card.Body className="about-card">
                                            <img src={award} alt="icon tuck" className="icon-img" /><br /><br />
                                            <Card.Title><b>Best Quality</b></Card.Title>
                                            <Card.Text>
                                                Variation of passages of Lorem <br /> Ipsum avaliable
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Blog;