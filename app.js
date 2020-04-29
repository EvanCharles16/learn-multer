var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const privateKey = "secret";

var indexRouter = require("./routes/index");
const menuRouter = require("./routes/Menu");
const usersRouter = require("./routes/Users");
const categoryRouter = require("./routes/Category");

var app = express();
mongoodConnect = process.env.DB_CONNECTION;
mongoose.connect(mongoodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/menu", validateUser, menuRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-token"], privateKey, (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

module.exports = app;
