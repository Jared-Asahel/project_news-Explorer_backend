const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

const {
  validateArticle,
  validateArticleId,
} = require("../middlewares/validators");

// GET /articles → obtiene todos los artículos del usuario logueado
router.get("/", getArticles);

// POST /articles → guarda un nuevo artículo del usuario
router.post("/", validateArticle, createArticle);

// DELETE /articles/:id → borra un artículo por ID (si pertenece al usuario)
router.delete("/:id", validateArticleId, deleteArticle);

module.exports = router;
