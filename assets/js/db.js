var MongoClient = require('mongodb').MongoClient;
var databaseUrl = "mongodb://stephoknee:mangoes123@ds237563.mlab.com:37563/heroku_r7mpww3s";
// Connect to the db
MongoClient.connect(databaseUrl , function(err, db) {
     if(!err) {
         console.log("We are connected");
         // in variable db is your db connection
      }

      var dbo = db.db("heroku_r7mpww3s");
      var query = { gender: "Male" };
      dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
  });
});
