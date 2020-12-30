var express = require("express");
var router = express.Router();

const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.username) {
    res.redirect("/userview");
  } else {
    res.render("sign", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle")
    });
  }
});

router.post(
  "/create",
  body("*").trim().escape().isLength({ min: 1 }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (req.app.get("userbase").indexOf(req.body.author) >= 0) {
      throw new Error("Username already exists");
    } else if (!errors.isEmpty()) {
      throw new Error("Username not long enough");
    } else {
      var username = req.body.author;
      console.log("New user created: " + username);
      //
      //Go to userview-page with note of the sellected user
      req.session.username = username;
      req.app.get("userbase").push(username);
      res.redirect("/ownpage");
    }
    //
  }
);

module.exports = router;
