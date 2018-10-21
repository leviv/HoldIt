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

app.get('/', (request, response) => {

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
          //response.send(result)
          // assert.equal(err, null);
          // console.log("Found the following records");
          // console.log(result);
          // callback(result);
        db.close();
    });
  });

  response.render('home', {
    name: 'John'
  })

})

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
          array.push(req.body.myData);
          // add email to the queue
          dbo.collection("flight").updateOne({_id: id}, {$push: {queue: req.body.myData}}, function(err, record) {
            if(err)
              throw err;
            else
              console.log("yes");
            db.close();
          });
          // TODO: Update the queue
         });

    });
  });


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
