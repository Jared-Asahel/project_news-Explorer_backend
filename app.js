const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/newsExplorer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });

app.use(cors());
app.options("/*splat", cors());

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
