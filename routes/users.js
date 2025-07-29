const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// GET /users/me → obtener datos del usuario autenticado
router.get("/me", getCurrentUser);

module.exports = router;
