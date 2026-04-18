const { Product } = require("../models");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { isDeleted: false },
      order: [["id", "DESC"]]
    });

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        isDeleted: false
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ msg: "name, price y stock son requeridos" });
    }

    const product = await Product.create({
      name,
      price,
      stock
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        isDeleted: false
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await product.update({
      name: name ?? product.name,
      price: price ?? product.price,
      stock: stock ?? product.stock
    });

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        isDeleted: false
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await product.update({ isDeleted: true });

    return res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
