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
  let query = req.body;
  query.startDate = moment().format("LLL");
  query.lastSearched = null;
  information.addNewUser(query);
  console.log(req.body);
  res.end();
});

router.get("/users", (req, res, next) => {
  information.getUsersToSearch().then(users => {
    res.send(users);
  });
});

module.exports = router;
