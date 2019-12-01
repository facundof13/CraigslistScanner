var mongoConnect = require("./mongoUtil");
var db = mongoConnect.getDb();
const information = db.collection("information");
const moment = require("moment");
var ObjectId = require("mongodb").ObjectID;

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
        //we want all users from before this moment and all those who are null
        if (i.lastSearched !== null) {
          return moment(users[0].lastSearched).isBefore(
            moment().format("LLL"),
            "hours"
          );
        } else {
          return false;
        }
      });
      users.map(i => {
        if (i.lastSearched === null) {
          filtered.push(i);
        }
      });
      res(filtered);
    });
  });
}

function updateUserSearched(id) {
  console.log(id);
  information.updateOne(
    { _id: ObjectId(id) },
    { $set: { lastSearched: moment().format("LLL") } },
    (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(item);
      }
    }
  );
}

module.exports = {
  getAllUsers,
  addNewUser,
  getUsersToSearch,
  updateUserSearched
};
