import { Carousel, Container } from "react-bootstrap";
import client from '../../assets/client.jpg'
import { useState } from "react";

function Testimonial() {
    const [index, setIndex] = useState();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const testimonials = [
        {
            name: "Anna Trevor",
            role: "Customer",
            text: "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.",
            image: client
        },
        {
            name: "Anna Trevor",
            role: "Customer",
            text: "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.",
            image: client
        },
        {
            name: "Anna Trevor",
            role: "Customer",
            text: "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.",
            image: client
        },
    ]

    return (
        <>
            <h1 className="heading">Testimonial</h1>
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
        </>
    );
}

export default Testimonial;