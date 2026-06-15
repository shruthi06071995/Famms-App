import Carousel from "react-bootstrap/Carousel";
import "./Home.css";
import images from "../../assets/slider.jpg";
import { Button, Card, Col, Container, Form, Row, Stack } from "react-bootstrap";
import truck from '../../assets/truck.png';
import free from '../../assets/free.png'
import award from '../../assets/reward.png'
import arrival from '../../assets/arrival.png'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import client from '../../assets/client.jpg'
import abc from '../../assets/abc.jpeg'
import male from '../../assets/male.jpg'
import logo from '../../assets/logo.png'

function Home({ products = [], productsLoading, productsError }) {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [index, setIndex] = useState(0);

    // TOTAL COUNT 
    const totalQty = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const testimonials = [
        {
            name: "Alexa",
            role: "Customer",
            text: "I completely love this site. I just order directly through this site... I am always complemented on my outfits I will be back for more... Thank you for having cute trendy clothes that fit and look good.",
            image: client
        },
        {
            name: "Joy",
            role: "Customer",
            text: "I love the clothes from this website!! I am so glad I found them...everything has been spot on, fits wonderfully, styles are trendy and lots to choose from!! Thanks for being here of us!!!",
            image: abc
        },
        {
            name: "Anna Trevor",
            role: "Customer",
            text: "This is my very first order through site, and I am totally and completely satisfied! The fit is great and so are the prices. I will definitely return again and again...",
            image: male
        },
    ]

    return (
        <>
        {/* First Section Content Starts  */}
            <Carousel>

                <Carousel.Item>
                    <div className="custom-slide">
                        <img
                            className="d-block custom-image"
                            src={images}
                            alt="slide"
                        />
                        <Carousel.Caption className="custom-caption" >
                            <h1>
                                <span>Sale 20% off</span> <br />
                                On Everything
                            </h1>
                            <p>Explicabo esse amet tempora quibusdam laudantium, laborum <br /> eaque magnam fugiat hic? Esse dicta aliquid error repudiandae <br /> earum suscipit fugiat molestias, veniam, vel architecto veritatis <br /> delectus repellat modi impedit sequi.</p>
                            <button>Shop Now</button>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="custom-slide">
                        <img
                            className="d-block custom-image"
                            src={images}
                            alt="slide"
                        />
                        <Carousel.Caption className="custom-caption" >
                            <h1>
                                <span>Sale 20% off</span> <br />
                                On Everything
                            </h1>
                            <p>Explicabo esse amet tempora quibusdam laudantium, laborum <br /> eaque magnam fugiat hic? Esse dicta aliquid error repudiandae <br /> earum suscipit fugiat molestias, veniam, vel architecto veritatis <br /> delectus repellat modi impedit sequi.</p>
                            <button>Shop Now</button>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="custom-slide">
                        <img
                            className="d-block custom-image"
                            src={images}
                            alt="slide"
                        />
                        <Carousel.Caption className="custom-caption" >
                            <h1>
                                <span>Sale 20% off</span> <br />
                                On Everything
                            </h1>
                            <p>Explicabo esse amet tempora quibusdam laudantium, laborum <br /> eaque magnam fugiat hic? Esse dicta aliquid error repudiandae <br /> earum suscipit fugiat molestias, veniam, vel architecto veritatis <br /> delectus repellat modi impedit sequi.</p>
                            <button>Shop Now</button>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
            {/* First Section Content Ends  */}

            {/* BLOG  SECTION STARTS  */}
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
            {/* BLOG  SECTION ENDS  */}

            {/* Arrival Section  */}
            <section className="arrival-section">
                <Container>
                    <Row className="align-items-center justify-content-between arrival-row">
                        <Col md={7} className="arrival-img">
                            <img src={arrival} alt="arrival" className="img-fluid" />
                        </Col>
                        <Col md={5} className="arrival-content">
                            <h1>#New Arrivals</h1>
                            <p>Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi, rem vel, ea eaque ab ipsa, autem similique ex unde!</p>
                            <button className="shop-btn mt-3">Shop Now</button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Arrival Section ends  */}

            {/* Product section Starts  */}
            <section>
                <div>
                    <Container>
                        <h2 className="section-title">Our <span>Product</span></h2>
                        <Row className="g-4">
                            {products.map((prod) => (
                                <Col lg={3} md={4} sm={6} xs={12} key={prod.id}>
                                    <ProductCard product={prod} />
                                </Col>
                            ))}
                        </Row>
                        {productsLoading && <p className="text-center mt-4">Loading products...</p>}
                        {!productsLoading && productsError && (
                            <p className="text-center text-danger mt-4">{productsError}</p>
                        )}
                        <div className="text-center mt-4">
                            <Link to="/products">
                                <button className="view-btn">
                                    View All products
                                </button>
                            </Link>
                        </div>
                    </Container>
                </div>
            </section>
            {/* Product Section Ends  */}

            {/* Subscribtion Section starts */}
            <section className="subscribe">
                <Container className="subscribe-content">
                    <h2>Subscribe To Get Discount Offers</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                    <input type="text" placeholder="Enter Your Email" /><br /><br />
                    <button>SUBSCRIBE</button>
                </Container>
            </section>
            {/* Subscribtion Section Ends  */}

            {/* Testimonial Section Starts  */}
            <section>
                <h2 className="testimonial-title">Customer's Testimonial</h2>

                <div className="underline"></div>
                <div className="carousel-wrapper">
                    {/* LEFT BUTTON  */}
                    <button className="custom-arrow left"
                        onClick={() => setIndex(index === 0 ? testimonials.length - 1 : index - 1)}
                    >
                        ←
                    </button>

                    {/* CAROUSEL  */}
                    <Carousel
                        activeIndex={index}
                        onSelect={handleSelect}
                        controls={false}
                        indicators={false}
                        interval={3000}
                        className="slide"
                    >
                        {testimonials.map((item, i) => (
                            <Carousel.Item key={i}>
                                <div className="testimonial-content">
                                    <img className="rounded-circle user-img" src={item.image} alt="customer" />
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                    <p>{item.text}</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    {/* RIGHT BUTTON  */}
                    <button
                        className="custom-arrow right"
                        onClick={() =>
                            setIndex(index === testimonials.length - 1 ? 0 : index + 1)
                        }
                    >
                        →
                    </button>

                </div>
            </section>
            {/* Testimonial Section ends  */}

        </>
    );
}

export default Home;
