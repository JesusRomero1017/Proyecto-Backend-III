const { sequelize } = require("../config/db");
const { Movement, Product, User } = require("../models");

const createMovement = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { product: productId, type, quantity, note } = req.body;

    if (!productId || !type || !quantity) {
      await transaction.rollback();
      return res.status(400).json({ msg: "product, type y quantity son requeridos" });
    }

    if (!["IN", "OUT"].includes(type)) {
      await transaction.rollback();
      return res.status(400).json({ msg: "type debe ser IN o OUT" });
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty <= 0) {
      await transaction.rollback();
      return res.status(400).json({ msg: "quantity debe ser un entero mayor a 0" });
    }

    const product = await Product.findOne({
      where: { id: productId, isDeleted: false },
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    if (!product) {
      await transaction.rollback();
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (type === "OUT" && product.stock < qty) {
      await transaction.rollback();
      return res.status(400).json({ msg: "Stock insuficiente para la salida" });
    }

    const newStock = type === "IN" ? product.stock + qty : product.stock - qty;
    await product.update({ stock: newStock }, { transaction });

    const movement = await Movement.create(
      {
        productId: product.id,
        userId: req.user.id,
        type,
        quantity: qty,
        note
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json(movement);
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const getMovements = async (req, res, next) => {
  try {
    const where = {};

    if (req.query.type) {
      where.type = req.query.type;
    }

    if (req.query.productId) {
      where.productId = req.query.productId;
    }

    const movements = await Movement.findAll({
      where,
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "stock"]
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["id", "DESC"]]
    });

    return res.status(200).json(movements);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMovement,
  getMovements
};
