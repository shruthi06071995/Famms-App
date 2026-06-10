import products from "../../data/products.js";

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

  const search = req.query.search;

  const result = products.filter(
    p =>
      p.title.toLowerCase()
        .includes(search.toLowerCase())
  );

  res.json(result);

}