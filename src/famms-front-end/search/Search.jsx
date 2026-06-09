import { useState } from "react";

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
        {filteredProducts.map(product => (
          <p key={product.id}>
            {product.title}
          </p>
        ))}
      </div>

    </div>
  );
}

export default Search;
