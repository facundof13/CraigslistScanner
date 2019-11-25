require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_USER;

var _db;

module.exports = {
  connectToServer: function(callback) {
    MongoClient.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(err, client) {
        if (err) console.log(err);
        _db = client.db("CraigslistScanner");
        return callback(err);
      }
    );
  },

  getDb: function() {
    return _db;
  }
};
