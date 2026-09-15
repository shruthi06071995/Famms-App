import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { motion } from "framer-motion";

function Products({
  products = [],
  productsLoading = false,
  productsError = "",
  fetchProducts,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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

  // Pagination
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, category]);

  return (
    <>
      <div className="heading">
        <h1>Products</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="product-page">
          <h2 className="section-title">
            Our <span>Product</span>
          </h2>

          <motion.div>
            <Row className="mb-4  justify-content-center">
              <Col lg={3} className="d-flex justify-content-center"
                md={4}
                sm={6}
                xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="filter-input"
                  style={{ maxWidth: "250px" }}
                />
              </Col>

              <Col lg={3} className="d-flex justify-content-center"
                md={4}
                sm={6}
                xs={12}>
                <Form.Select
                  onChange={(e) => setSort(e.target.value)}
                  style={{ maxWidth: "250px" }}
                  className="filter-input"
                >
                  <option value="">Sort by Price</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </Form.Select>
              </Col>

              <Col lg={3} className="d-flex justify-content-center"
                md={4}
                sm={6}
                xs={12}
                >
                <Form.Select 
                onChange={(e) => setCategory(e.target.value)}
                className="filter-input"
                style={{ maxWidth: "250px" }}
                  >
                  <option value="">All Categories</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </Form.Select>
              </Col>
            </Row>
          </motion.div>

          {productsLoading &&
            <motion.p
              className="text-center mt-4"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Loading products...
            </motion.p>
          }
          {!productsLoading && productsError && (
            <p className="text-center text-danger mt-4">{productsError}</p>
          )}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <Row className="products g-4 justify-content-center">
              {currentProducts.map((prod) => (

                <Col xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  key={prod._id || prod.id}>

                  <ProductCard product={prod} fetchProducts={fetchProducts} />

                </Col>

              ))}
            </Row>
          </motion.div>
          {!productsLoading && filteredProducts.length === 0 && (
            <motion.p
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >

              No products match your filters.

            </motion.p>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">

              <button
                className="btn btn-outline-danger"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >

                Previous

              </button>

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  className={`btn ${currentPage === index + 1
                    ? "btn-danger"
                    : "btn-outline-danger"
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>

              ))}

              <button
                className="btn btn-outline-danger"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >

                Next

              </button>

            </div>
          )}

        </Container>
      </motion.div>
    </>
  );
}

export default Products;