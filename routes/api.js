var express = require("express");
var request = require("request");
const fetch = require("node-fetch");

var router = express.Router();
var r = process.env.PROXY
  ? request.defaults({ proxy: process.env.PROXY })
  : request;

router.get("/", function (req, res, next) {
  res.send("respond with a resource get");
});
router.post("/", function (req, res, next) {
  const formBody = Object.keys(req.body)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(req.body[key])
    )
    .join("&");

  fetch(process.env.registerUrl, {
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

  // try {
  //   console.log({ header: req.headers });
  //   request.post(
  //     process.env.registerUrl,
  //     { form: { ...req.body } },
  //     function (err, httpResponse, body) {
  //       console.log({ err });
  //       res.json({ body });
  //     }
  //   );
  // } catch (error) {
  //   res.json({ error });
  // }
});

module.exports = router;
