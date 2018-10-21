const express = require('express')
const app = express()
const port = 3000
const assert = require('assert')


// index.js
const path = require('path')
const exphbs = require('express-handlebars')

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('assets'));

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var router = express.Router();


app.get('/', (request, response) => {

  var MongoClient = require('mongodb').MongoClient;
  var databaseUrl = "mongodb://stephoknee:mangoes123@ds237563.mlab.com:37563/heroku_r7mpww3s";
  var array = [];
  var i;
  // Connect to the db
  MongoClient.connect(databaseUrl , function(err, db) {
       if(!err) {
           console.log("We are connected");
           // in variable db is your db connection
        }

        var ObjectId = require('mongodb').ObjectId;
        var dbo = db.db("heroku_r7mpww3s");
        var id = new ObjectId("5bcb8ad9780291346ff05d47");
        var query = {_id: id};
        dbo.collection("flight").find(query).toArray(function(err, result) {
          if (err) throw err;
          array = result[0].queue;
          db.close();
          response.render('home', {
            name: array
          })
        });

  });

})

// Whenever the form is submitted by User
// Email is stored in req.body.myData
app.post('/thank', urlencodedParser, function (req, res){
  console.log(req.body.myData);
  var MongoClient = require('mongodb').MongoClient;
  var databaseUrl = "mongodb://stephoknee:mangoes123@ds237563.mlab.com:37563/heroku_r7mpww3s";
  // Connect to the db
  MongoClient.connect(databaseUrl , function(err, db) {
       if(!err) {
           console.log("We are connected");
           // in variable db is your db connection
        }
        var ObjectId = require('mongodb').ObjectId;
        var dbo = db.db("heroku_r7mpww3s");
        var id = new ObjectId("5bcb8ad9780291346ff05d47");
        var query = {_id: id};
        dbo.collection("flight").find(query).toArray(function(err, result) {
          if (err) throw err;
          //response.send(result)
          // assert.equal(err, null);
          // console.log("Found the following records");
          // console.log(result);
          // callback(result);
          // add email to the queue
          dbo.collection("flight").updateOne({_id: id}, {$push: {queue: req.body.myData}}, function(err, record) {
            if(err)
              throw err;
            else
              console.log("yes");
            db.close();
          });
         });

    });

});

// Whenever you go to the url from qr code
// Email is stored in req.params.id
app.get('/post/:id', async function (req, res) {

   // Retrieve the tag from our URL path
  // console.log(req.params.id);

   // TODO: Update the queue
   var MongoClient = require('mongodb').MongoClient;
   var databaseUrl = "mongodb://stephoknee:mangoes123@ds237563.mlab.com:37563/heroku_r7mpww3s";
   var array = [];
   // Connect to the db
   MongoClient.connect(databaseUrl , function(err, db) {
        if(!err) {
            console.log("We are connected here");
            // in variable db is your db connection
         }
         var ObjectId = require('mongodb').ObjectId;
         var dbo = db.db("heroku_r7mpww3s");
         var id = new ObjectId("5bcb8ad9780291346ff05d47");
         var query = {_id: id};
         dbo.collection("flight").updateOne(query, {$pop: {queue:-1}});
         dbo.collection("flight").find(query).toArray(function(err, result) {
           if (err) throw err;
           array = result[0].queue;
           console.log(result[0].queue);
           db.close();
           res.render('home', {
             name: array
           })
         });
 });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
