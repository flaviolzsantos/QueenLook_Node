var express = require('express'),
    bodyParser = require('body-parser');
    srvHome = require('./servico/adm/home')

var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(express.static('html\\src'));

 
app.get('/', function (req, res) {
  res.send('Hello World')
  console.log(srvHome.Listar());
})
 
app.listen(3000)