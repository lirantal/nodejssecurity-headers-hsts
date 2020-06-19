const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    return res.render("home", {
      layout: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
