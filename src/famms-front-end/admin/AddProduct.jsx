import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const AddProduct = ({ fetchProducts }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !price || !category) {
            setError("Please fill all required fields");
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        // Extra safety check even though ProtectedRoute already handles this
        if (!userInfo || !userInfo.token) {

            navigate("/login");
            return;

        }

        try {

            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },

                body: JSON.stringify({
                    title,
                    price: Number(price),
                    category,
                    image,
                    description,
                }),

            });

            const data = await res.json();

            if (!res.ok) {

                setError(data.message || "Failed to add product");
                return;

            }

            setSuccess("Product added successfully!");
            await fetchProducts();
            navigate("/admin/products")

        } catch (err) {

            setError("Server error, try again");

        }

        setTimeout(() => {
            navigate("/admin/products");
        }, 1000);

    };

   


    return (

        <Container className="mt-5" style={{ maxWidth: "500px" }}>

            <h2>Add New Product</h2>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">

                    <Form.Label>Title</Form.Label>

                    <Form.Control

                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Price</Form.Label>

                    <Form.Control

                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}

                    />
                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Category</Form.Label>

                    <Form.Select

                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                    >
                        <option value="">Select category</option>

                        <option value="men">Men</option>

                        <option value="women">Women</option>

                    </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Image URL</Form.Label>

                    <Form.Control

                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}

                    />
                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Description</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </Form.Group>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

                <Button type="submit">Add Product</Button>

            </Form>

        </Container>
    );
};

export default AddProduct;