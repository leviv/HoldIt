const express = require('express')
const app = express()
const port = 3000


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
        db.close();
    });
  });

  response.render('home', {
    name: 'John'
  })

})

// Whenever the form is submitted by User
// Email is stored in req.body.myData
app.post('/thank', urlencodedParser, function (req, res){
  console.log(req.body.myData);
  // TODO: Update the queue
});

// Whenever you go to the url from qr code
// Email is stored in req.params.id
app.get('/post/:id', async function (req, res) {

   // Retrieve the tag from our URL path
   console.log(req.params.id);

   // TODO: Update the queue

   res.render('home', {
     name: 'John'
   })
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
