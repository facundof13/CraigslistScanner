var express = require("express");
var app = express();
var mongoUtil = require("./mongoUtil");

mongoUtil.connectToServer((err, client) => {
  if (err) console.log(err);
  var path = require("path");
  var cookieParser = require("cookie-parser");
  var logger = require("morgan");
  var indexRouter = require("./routes/index");
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/", indexRouter);
});

module.exports = app;
