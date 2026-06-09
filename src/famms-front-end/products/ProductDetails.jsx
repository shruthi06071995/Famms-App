import { useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();

    return (
        <div className="container mt-5">
            <h2>Product Details</h2>
            <p>Product ID : {id}</p>
        </div>
    );
}

export default ProductDetails;