const notFoundHandler = (req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "Error interno del servidor";

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ msg });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
