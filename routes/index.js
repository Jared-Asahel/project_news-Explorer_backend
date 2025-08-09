const router = require("express").Router();
const { validateSignup, validateSignin } = require("../middlewares/validators");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const articleRoutes = require("./articles");
const newsRouter = require("./news");

// Ruta pública sin autenticación
router.use("/api", newsRouter);

// Rutas de auth
router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

// Middleware de autenticación (protege todo lo que sigue)
router.use(auth);
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);

module.exports = router;
