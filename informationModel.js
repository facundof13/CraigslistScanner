var mongoConnect = require("./mongoUtil");
var db = mongoConnect.getDb();
const information = db.collection("information");
const moment = require("moment");

//get all users

function getAllUsers() {
  return new Promise((res, rej) => {
    information.find().toArray((err, items) => {
      res(items);
    });
  });
}

function addNewUser(query) {
  information.insertOne(query);
}

function getUsersToSearch() {
  return new Promise((res, rej) => {
    getAllUsers().then(users => {
      let filtered = users.filter(i => {
        if (i.lastSearched !== null) {
          return (
            moment(users[0].lastSearched).diff(
              moment().format("LLL"),
              "hours"
            ) < 24 // GET TIME DIFFERENCE FROM SERVER
          );
        } else {
          return false;
        }
      });
      res(filtered);
    });
  });
}

module.exports = {
  getAllUsers,
  addNewUser,
  getUsersToSearch
};
