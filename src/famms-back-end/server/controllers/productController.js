import products from "../../data/productsData.js";

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

export const createProduct = (req, res) => {

  const newProduct = {
    id: products.length + 1,
    ...req.body
  };

  products.push(newProduct);

  res.status(201).json(newProduct);

}

export const updateProduct = (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    p => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products[index] = {
    ...products[index],
    ...req.body
  };

  res.json(products[index]);

}

export const deleteProduct = (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    p => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products.splice(index, 1);

  res.json({
    message: "Product deleted"
  });

}

export const searchProducts = (req, res) => {
  const keyword = req.query.keyword || "";

  const filteredProducts = products.filter((product) =>
    (product.title || "")
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  res.json(filteredProducts);
};

export const filterProducts = (req, res) => {
  const { category } = req.query;

  const filteredProducts = products.filter(
    product =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );

  res.json(filteredProducts);
};

export const sortProducts = (req, res) => {
  const sortedProducts = [...products].sort(
    (a, b) => a.price - b.price
  );

  res.json(sortedProducts);
};