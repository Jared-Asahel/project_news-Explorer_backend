const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Crear nuevo usuario (POST /signup)
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409;
      err.message = "Correo ya registrado";
    } else {
      err.statusCode = 400;
      err.message = "Datos inválidos";
    }
    next(err);
  }
};

// Login (POST /signin)
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Credenciales incorrectas");
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      const error = new Error("Credenciales incorrectas");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Error en el servidor";
    }
    next(err);
  }
};

// Obtener datos del usuario (GET /users/me)
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.send({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
