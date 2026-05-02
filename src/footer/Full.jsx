import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../footer/footer.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Full() {
    return (
        <>
            <section className="last-section">
                <Container>
                    <Row className="footer-row">

                        {/* Column 1  */}
                        <Col md={4}>
                            <div>
                                <a href="#"><img src={logo} alt="logo" width="190px" /></a>
                                <p><b>ADDRESS:</b> 28 White tower, Street Name New Delhi, INDIA</p>
                                <p><b>TELEPHONE:</b> +91 9234 5678 99</p>
                                <p><b>EMAIL:</b> FammsIndia@gmail.com</p>
                            </div>
                        </Col>

                        {/* Column 2  */}
                        <Col md={2}>
                            <h3>MENU</h3>
                            <Link to="/">Home</Link>
                            <Link to="/pages/about" >About</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/pages/testimonial">Testimonial</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/contact">Contact</Link>
                        </Col>

                        {/* Column 3 */}
                        <Col md={2}>
                            <h3>ACCOUNT</h3>
                            <a href="#account">Account</a>
                            <a href="#checkout">Checkout</a>
                            <a href="#login">Login</a>
                            <a href="#register">Register</a>
                            <a href="#shopping">Shopping</a>
                            <a href="#widget">Widget</a>
                        </Col>

                        {/* Column 4 */}
                        <Col md={4}>
                            <h3>NEWSLETTER</h3>
                            <p>Subscribe to our newsletter and get update notification</p>

                            <div className="newsletter-box">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                                <Button variant="danger">Subscribe</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Final Content Ends  */}

            {/* Footer section starts  */}
            <footer className="last-footer">
                <p>© 2022 All Rights Reserved</p>
                <p>Distributed By <a href="#">ThemeWagon</a></p>
            </footer>
            {/* Footer Section Ends  */}
        </>
    );
}

export default Full;