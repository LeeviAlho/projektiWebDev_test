// Require libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var Promise = require("bluebird");

//import styles from "./styles/style";

// Include external files
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userviewRouter = require("./routes/userview");
var loginRouter = require("./routes/login");
var signRouter = require("./routes/sign");
var ownpageRouter = require("./routes/ownpage");

// Start the app itself
var app = express();

// Connect to database - copied from work made by Antti Knutas
var db = require("./db");
db.connect(db.urlbuilder(), function (err) {
  if (err) {
    console.log("Unable to connect to Mongo.");
    process.exit(1);
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Use logging and set settings
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("maanantaiaamut"));
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "maanantaiaamut",
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 900000 }
  })
);

// Define routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/userview", userviewRouter);
app.use("/login", loginRouter);
app.use("/sign", signRouter);
app.use("/ownpage", ownpageRouter);

app.set("postStorrage", []);
app.set("userinfo", []);
app.set("userbase", []);

app.set("title", "WASP");
app.set("subtitle", "Web Applications Social Platform");

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Register error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export app to use with www.js
module.exports = app;
