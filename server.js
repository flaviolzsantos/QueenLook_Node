var express = require('express'),
    bodyParser = require('body-parser'),
    srvHome = require('./servico/adm/srvHome'),
    multer  =   require('multer'),
    multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/html/src/images/backgroud');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage : storage }).single('files');
var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/html/src'));
app.use('/adm', express.static(__dirname + '/html/src/adm'));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
 
app.get('/', function (req, res) {
  srvHome.Listar(function(error){
        if(error != null){
            //res.statusCode = 502;
            res.send(error.message);            
        }else{
            res.send("sucesso");
        }
  });
})

app.get('/Admin/Home/ObterListaHome',function(req, res){
    
    srvHome.Listar(function(erro,lista){
        res.send(lista);
    });
     
});

app.post('/Admin/Home/CadastrarHome',function(req,res){    
    srvHome.Salvar(req.body,function(erro){
        if(erro){
            res.send({status:500, message: erro});
        }else
            res.send({status:200, message: "Salvo com sucesso"});
    });
});
 
app.delete('/Admin/Home/Deletar',function(req,res){
    
    srvHome.Deletar(req.body.id,function(erro, result){
        if(erro)
            res.send({status:500, message: erro});
        else
            res.send({status:200, message: "Deletado com sucesso"});
    });
});

app.post('/Admin/Home/AtivarOuDesativar', function(req, res){
    srvHome.AtivarOuDesativar(req.body.id,function(erro, result){
        if(erro)
            res.send({status:500, message: erro});
        else
            res.send({status:200, message: result}); 
    });
});

app.post('/Admin/Home/UploadFile',function(req,res){
    upload(req, res, function (err) {
    if (err) {
        //console.log(req.file);
        res.send(err);
        return;
    }
    console.log(req.file);
    res.send('Profile ok');
  });
});
  
app.listen(3000);
