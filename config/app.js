var express = require('express'),
    bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.prod = false;

app.use(bodyParser.json());
app.use(express.static('./html/src'));
//app.use('/adm', express.static(__dirname + '../html/src/adm'));
app.use('/adm', express.static('./html/src/adm'));
app.use(function (req, res, next) {
    if(req.get('host') == "localhost:3000"){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        app.prod = false;
    }else{
        res.setHeader('Access-Control-Allow-Origin', 'http://www.queenlook.com.br');    
        app.prod = true;
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports = app;