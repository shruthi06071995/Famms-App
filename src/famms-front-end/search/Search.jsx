import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../products/ProductCard";

function Search({ products = [], productsLoading, productsError }) {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">

      <input
        type="text"
        placeholder="Search products..."
        className="form-control search-input"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <div className="mt-4">

        {productsLoading && <p>Loading products...</p>}

        {!productsLoading && productsError && (
          <p className="text-danger">{productsError}</p>
        )}

        <Row className="g-4">

          {filteredProducts.map((product) => (

            <Col
              xl={3}
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={product._id}
            >

              <ProductCard product={product} />

            </Col>

          ))}

        </Row>

      </div>

    </div>
  );
}

export default Search;
