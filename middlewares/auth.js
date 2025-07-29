const jwt = require("jsonwebtoken");

const { JWT_SECRET = "dev-secret" } = process.env; // valor por defecto para dev

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // Verifica que el header exista y comience con "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorización requerida" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET); // decodifica token
    req.user = payload; // lo guarda para el siguiente middleware
    next(); // continúa
  } catch (err) {
    res.status(401).send({ message: "Token inválido o expirado" });
  }
};

module.exports = auth;
