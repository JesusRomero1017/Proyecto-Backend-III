const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDatabase } = require("./config/db");
const { initModels } = require("./models");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const movementRoutes = require("./routes/movementRoutes");
const { notFoundHandler, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de inventario activa",
    docs: {
      auth: "/api/auth",
      products: "/api/products",
      movements: "/api/movements"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/movements", movementRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDatabase();
    await initModels();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
