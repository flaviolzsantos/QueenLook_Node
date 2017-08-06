var express = require('express'),
    bodyParser = require('body-parser'),
    srvHome = require('./servico/adm/srvHome'),
    srvUi = require('./servico/ui/srvUi');

var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/html/src'));
app.use('/adm', express.static(__dirname + '/html/src/adm'));
app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.setHeader('Access-Control-Allow-Origin', 'http://www.queenlook.com.br');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
 
app.get('/Admin/Home/ObterListaHome', srvHome.Listar);
app.post('/Admin/Home/CadastrarHome',srvHome.Salvar); 
app.delete('/Admin/Home/Deletar',srvHome.Deletar);
app.post('/Admin/Home/AtivarOuDesativar', srvHome.AtivarOuDesativar);
app.post('/Admin/Home/UploadFile',srvHome.UploadImagem);

app.get('/Ui/Home/ObterHome',srvUi.ListarHome)
  
app.listen(3000);
