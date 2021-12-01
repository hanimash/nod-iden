var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var apiRouter = require("./routes/api");
var api2Router = require("./routes/api2");

var app = express();
app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", process.env.PROXY);
app.use("/api/register", apiRouter);
app.use("/api2/register", api2Router);
app.use("/info", function (req, res) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.json({
    fullUrl,
  });
});

module.exports = app;
