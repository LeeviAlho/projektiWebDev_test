var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  if (req.session.username) {
    var username = req.session.username;
    res.render("index", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      posts: postdata,
      author: username
    });
  } else {
    res.render("index", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      posts: postdata
    });
  }
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.session.username;

  var local_time = new Date();
  // var local_time =
  //   today.getUTCFullYear() +
  //   "." +
  //   (today.getUTCMonth() + 1) +
  //   "." +
  //   today.getUTCDate() +
  //   " " +
  //   today.getUTCHours() +
  //   ":" +
  //   today.getUTCMinutes() +
  //   ":" +
  //   today.getUTCSeconds();
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);

  console.log("At: " + local_time);
  req.app.get("postStorrage").unshift({
    author: local_author,
    message: local_message,
    time: local_time
  });

  res.redirect("/");
});

module.exports = router;
