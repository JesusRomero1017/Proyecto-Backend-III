const { sequelize } = require("../config/db");
const User = require("./User");
const Product = require("./Product");
const Movement = require("./Movement");

Product.hasMany(Movement, { foreignKey: "productId", as: "movements" });
Movement.belongsTo(Product, { foreignKey: "productId", as: "product" });

User.hasMany(Movement, { foreignKey: "userId", as: "movements" });
Movement.belongsTo(User, { foreignKey: "userId", as: "user" });

const initModels = async () => {
  await sequelize.sync({ alter: false });
};

module.exports = {
  User,
  Product,
  Movement,
  initModels
};
