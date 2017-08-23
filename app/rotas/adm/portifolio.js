let Repositorio = require('../../../config/repositorio').Repositorio,
multer  =   require('multer');
var Jimp = require("jimp");

var storagePortifolio =   multer.diskStorage({
destination: function (req, file, callback) {
    let caminho = __dirname.substring(0, __dirname.length - '\\app\rotas\adm'.length - 1); 
    //console.log(caminho); 
    
    callback(null, caminho + 'html\\src\\images\\portifolio');
},
filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
}
});

let uploadPortifolio = multer({ storage : storagePortifolio }).single('files');

let repositorio = new Repositorio();

module.exports = function(app){

    app.post('/Admin/Portifolio/Cadastrar',function(req,res){
        let obj = req.body;
        let call = function(erro){
            if(erro){
                res.send({status:500, message: erro});
            }else
                res.send({status:200, message: "Salvo com sucesso"});
        };

        if(obj["_id"] == ''){//Novo
            repositorio.Salvar("Portifolio",obj,function(ret){
                call();
            }); 
        }else{            
            repositorio.Atualizar("Portifolio",obj,function(ret){
                call();
            })
        }
    });

    app.get('/Admin/Portifolio/ObterPortifolio', function(req, res){    
        repositorio.ObterUnicoDocumento("Portifolio",function(erro,lista){
            res.send(lista);
        })
    });

    app.post('/Admin/Portifolio/CadastrarItem',function(req,res){
        let obj = req.body;
        obj.Ativo = (obj.Ativo == 'true');

        let call = function(erro){
            if(erro){
                res.send({status:500, message: erro});
            }else
                res.send({status:200, message: "Salvo com sucesso"});
        };

        if(obj["_id"] == ''){//Novo                       
            obj.Ativo = true;  
            repositorio.Salvar("PortifolioItem",obj,function(ret){
                call();
            }); 
        }else{
            repositorio.Atualizar("PortifolioItem",obj,function(ret){
                call();
            })
        }
    });

    app.get('/Admin/Portifolio/ObterItem', function(req, res){
        repositorio.Obter("PortifolioItem", function(erro, dados){
            res.send(dados);
        });
    });

    app.post('/Admin/Portifolio/UploadFile',function(req, res){
        uploadPortifolio(req, res, function (err) {
            /*let caminho150 = req.file.destination + '\\150' + req.file.filename;

            Jimp.read(req.file.path, function (err, lenna) {
                if (err) throw err;
                console.log(lenna);
                lenna.resize(150, 150)   
                     .write(caminho150); 
            });*/
        if (err)
            res.send({status:500, message :err});
        else
            res.send({status: 200, nomeArquivo : req.file.filename});
        });
    });
}