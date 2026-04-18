const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Movement = sequelize.define(
  "Movement",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("IN", "OUT"),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "movements",
    timestamps: true
  }
);

module.exports = Movement;
