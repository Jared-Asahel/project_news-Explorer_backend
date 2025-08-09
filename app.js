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

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://newexplorer.mooo.com", // Todo minúsculas
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.options("/*splat", cors({ origin: allowedOrigins, credentials: true }));

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
