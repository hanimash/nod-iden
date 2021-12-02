var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const fetch = require("node-fetch");

// var axios = require("axios");
var qs = require("qs");
var app = express();
app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", process.env.PROXY);
app.post("/", (req, res) => {
  console.log("post");
  const formBody = Object.keys(req.body)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(req.body[key])
    )
    .join("&");

  fetch("https://ideenschmiede.telekom-dienste.de/api/v4/auth/register", {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      res.json({ body: JSON.stringify(body) });
    })
    .catch((err) => res.json({ body: "" }));
  // var config = {
  //   method: "post",
  //   url: "https://ideenschmiede.telekom-dienste.de/api/v4/auth/register",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   data: qs.stringify({ ...req.body }),
  // };
  // try {
  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //       res.json({ body: response });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       res.json({ body: error });
  //     });
  // } catch (error) {
  //   res.json({ body: error });
  // }
});
app.get("/", (req, res) => {
  console.log("get");
  res.json({ body: { ok: true, method: "get" } });
});
module.exports = app;
