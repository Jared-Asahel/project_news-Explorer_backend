const router = require("express").Router();
const { validateSignup, validateSignin } = require("../middlewares/validators");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const articleRoutes = require("./articles");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use(auth); // Protege todo lo siguiente
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);

module.exports = router;
