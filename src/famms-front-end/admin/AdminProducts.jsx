import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const response = await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert(response.data.message);

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Unable to delete product");

    }

  };

  return (

    <div className="container py-5">

      <h2 className="mb-4">
        All Products
      </h2>

      <Table striped bordered hover>

        <thead>

          <tr>

            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>{product.title}</td>
              <td>₹ {product.price}</td>
              <td>{product.category}</td>

              <td>
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </Table>

    </div>

  );

}

export default AdminProducts;