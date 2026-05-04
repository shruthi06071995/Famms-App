import React from "react";
import { useForm } from "react-hook-form";
import '../contact/contact.css';
import arrival from '../assets/arrival.png'
import { Col, Container, Row } from "react-bootstrap";

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = (data) => console.log(data);

    return (
        <>
            <h1 className="heading">Contact us</h1>

            <div className="contact-content">
                <form onSubmit={handleSubmit(handleRegistration)} >

                    {/* Name  */}
                    <input type="text" placeholder="Enter Your Full Name" {...register('name', { required: "Name is required" })} />
                    <small className="text-danger">
                        {errors?.name && errors.name.message}
                    </small>

                    {/* Email  */}
                    <input type="email" placeholder="Enter Your Email Address" {...register('email', { required: "Email is required" })} />
                    <small className="text-danger">
                        {errors?.email && errors.email.message}
                    </small>

                    {/* Subject  */}
                    <input type="text" placeholder="Enter Subject" {...register('subject', { required: "Subject is required" })} />
                    <small className="text-danger">
                        {errors?.subject && errors.subject.message}
                    </small>

                    {/* Message  */}
                    <textarea placeholder="Enter Your Message" {...register('messsage', { required: "Message is required" })} />
                    <small>
                        {errors?.message && errors.message.message}
                    </small>

                    <button type="submit" className="contact-btn">Submit</button>

                </form>
            </div>

            <div>
                <section className="arrival-section">
                    <Container>
                        <Row className="align-items-center arrival-row">
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
            </div>
        </>
    )

}

export default Contact;