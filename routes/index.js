var express = require("express");
var router = express.Router();
const information = require("../informationModel");
const moment = require("moment");
/* GET home page. */

router.get("/", (req, res, next) => {
  information.getAllUsers().then(response => {
    res.send(response);
  });
});

router.post("/newuser", (req, res, next) => {
  let query = req.body; //get query from user
  query.startDate = moment().format("LLL"); //add today's date
  query.lastSearched = null; //add last searched date

  information.addNewUser(query); //push to db
  res.end();
});

router.get("/users", (req, res, next) => {
  information.getUsersToSearch().then(users => {
    res.send(users);
  });
});

router.post("/updateuser", (req, res, next) => {
  information.updateUserSearched(req.body.id);
  res.end();
});

module.exports = router;
