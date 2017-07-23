var express = require('express'),
    bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('html\\src'));

 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)