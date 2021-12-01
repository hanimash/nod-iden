var express = require("express");
var request = require("request");
const fetch = require("node-fetch");

var router = express.Router();
var r = process.env.PROXY
  ? request.defaults({ proxy: process.env.PROXY })
  : request;

router.get("/", function (req, res, next) {
  res.send("respond with a resource get api2");
});
router.post("/", function (req, res, next) {
  try {
    request.post(
      process.env.registerUrl,
      { form: { ...req.body } },
      function (err, httpResponse, body) {
        console.log({ err });
        res.json({ body });
      }
    );
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
