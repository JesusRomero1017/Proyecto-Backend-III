const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    dialect: "mysql",
    logging: false
  }
);

const connectDatabase = async () => {
  await sequelize.authenticate();
  console.log("Conexion a MySQL establecida correctamente");
};

module.exports = {
  sequelize,
  connectDatabase
};
