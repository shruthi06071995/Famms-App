import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container mt-5">
            <img
                src={product.image}
                alt={product.title}
                width="300"
            />

            <h2>{product.title}</h2>

            <h4>${product.price}</h4>

            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetails;