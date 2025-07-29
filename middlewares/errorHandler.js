const errorHandler = (err, req, res, next) => {
  // Si ya se envió una respuesta, pasa el error
  if (res.headersSent) {
    return next(err);
  }

  // Si el error tiene un código de estado, lo usamos. Si no, 500.
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    message: statusCode === 500 ? "Error del servidor" : err.message,
  });
};

module.exports = errorHandler;
