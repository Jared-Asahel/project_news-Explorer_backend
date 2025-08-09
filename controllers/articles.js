const Article = require("../models/article");

// Obtener artículos del usuario autenticado
const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next(err); // pasa el error al errorHandler
  }
};

// Crear nuevo artículo
const createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).send(newArticle);
  } catch (err) {
    err.statusCode = 400;
    err.message = "Datos inválidos";
    next(err);
  }
};

// Eliminar artículo por ID
const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).select("+owner");

    if (!article) {
      const error = new Error("Artículo no encontrado");
      error.statusCode = 404;
      return next(error);
    }

    if (String(article.owner) !== req.user._id) {
      const error = new Error("No tienes permiso para eliminar este artículo");
      error.statusCode = 403;
      return next(error);
    }

    await article.deleteOne();
    res.send({ message: "Artículo eliminado" });
  } catch (err) {
    err.statusCode = 400;
    err.message = "ID inválido";
    next(err);
  }
};
/* 
const saveArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
}; */

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
