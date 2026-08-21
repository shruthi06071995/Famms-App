import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditProduct({ fetchProducts }) {

    const { id } = useParams();
    const navigate = useNavigate();

    // States 
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");

    const [loading, setLoading] = useState(true);

    // useEffect() 
    useEffect(() => {

        fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => res.json())
            .then((data) => {

                setTitle(data.title);
                setPrice(data.price);
                setDescription(data.description);
                setImage(data.image);
                setCategory(data.category);
                setCountInStock(data.countInStock);

                setLoading(false);

            });

    }, [id]);

    // submitHandler 
    const submitHandler = async (e) => {

        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const response = await fetch(
            `http://localhost:5000/api/products/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    image,
                    category,
                    countInStock,
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {

            await fetchProducts();

            alert("Product Updated Successfully");

            navigate("/admin/products");
            
        } else {

            alert(data.message);

        }

    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    // return() 
    return (
        <Container style={{ maxWidth: "700px", marginTop: "50px" }}>
            <h2 className="mb-4 text-center">Edit Product</h2>

            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3">
                    <Form.Label>Product Title</Form.Label>
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
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </Form.Group>

                <Button variant="danger" type="submit">
                    Update Product
                </Button>

            </Form>
        </Container>
    );

}

export default EditProduct;