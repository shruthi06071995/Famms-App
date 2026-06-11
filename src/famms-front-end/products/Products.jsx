import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import products from "../../famms-back-end/data/productsData";

function Products({
  products = [],
  productsLoading = false,
  productsError = "",
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [productsData, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products
    .filter((prod) => {
      const productName = (prod.title || prod.name || "").toLowerCase();
      return productName.includes(search.toLowerCase());
    })
    .filter((prod) =>
      category ? prod.category.toLowerCase() === category.toLowerCase() : true
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <div className="Heading">
        <h1>Products</h1>
      </div>

      <Container className="product-page">
        <h2 className="section-title">
          Our <span>Product</span>
        </h2>

        <Row className="mb-4 g-3">
          <Col lg={3}
            md={4}
            sm={6}
            xs={12}>
            <Form.Control
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col lg={3}
            md={4}
            sm={6}
            xs={12}>
            <Form.Select onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort by Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </Form.Select>
          </Col>

          <Col lg={3}
            md={4}
            sm={6}
            xs={12}>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </Form.Select>
          </Col>
        </Row>

        {productsLoading && <p className="text-center mt-4">Loading products...</p>}
        {!productsLoading && productsError && (
          <p className="text-center text-danger mt-4">{productsError}</p>
        )}
        <Row className="products">
          {filteredProducts.map((prod) => (
            <Col md={3} sm={6} xs={12} key={prod.id}>
              <ProductCard product={prod} />
            </Col>
          ))}
        </Row>
        {!productsLoading && filteredProducts.length === 0 && (
          <p className="text-center mt-4">No products match your filters.</p>
        )}

      </Container>
    </>
  );
}

export default Products;