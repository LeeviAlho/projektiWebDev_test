var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

var username;

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.app.get("postStorrage")) {
    var postdata = req.app.get("postStorrage");
  }

  if (req.session.username) {
    username = req.session.username;
  } else {
    res.redirect("/login");
  }
  console.log("Username set to: " + username);
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  res.render("ownpage", {
    title: req.app.get("title"),
    subtitle: req.app.get("subtitle"),
    posts: postdata,
    author: username,
    cookietimer: req.session.views
  });
});

router.get("/logout", function (req, res) {
  console.log("Logging out: " + username);
  req.session.username = "";
  res.redirect("/");
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.session.username;

  var local_time = new Date();
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);
  console.log("At: " + local_time);

  req.app.get("postStorrage").unshift({
    author: local_author,
    message: local_message,
    time: local_time
  });

  res.redirect("/ownpage");
});

// router.post("/create", body("*").trim().escape(), function (req, res, next) {
//   var username = req.body.username;
//   console.log("Username set to:" + username);
//   var local_message = req.body.message;
//   console.log("Sent message: " + local_message);
//   console.log("from: " + username);

//   req.app.get("postStorrage").push({
//     author: username,
//     message: local_message
//   });

//   res.redirect("/userview");
// });

module.exports = router;
