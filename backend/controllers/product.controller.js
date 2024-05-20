const Product = require("../models/product.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .send({ message: "Please provide the necessary information!" });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "An error occurred while creating the product.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "An error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Product with id ${req.params.id} not found.` });
      } else {
        res
          .status(500)
          .send({ message: "An error occurred while retrieving the product." });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message:
        "Please provide the necessary information to update the product!",
    });
  }

  Product.updateById(req.params.id, new Product(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Product with id ${req.params.id} not found.` });
      } else {
        res
          .status(500)
          .send({ message: "An error occurred while updating the product." });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Product with id ${req.params.id} not found.` });
      } else {
        res
          .status(500)
          .send({ message: "An error occurred while deleting the product." });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};
