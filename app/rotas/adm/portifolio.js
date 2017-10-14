let Repositorio = require('../../../config/repositorio').Repositorio,
multer  =   require('multer'),
fs = require('fs'),
caminho = __dirname.substring(0, __dirname.length - '\\app\rotas\adm'.length - 1) + 'html/imagesTmp';

var storagePortifolio =   multer.diskStorage({
destination: function (req, file, callback) {

    callback(null, caminho);
},
filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
}
});

let uploadPortifolio = multer({ storage : storagePortifolio }).single('files');

let repositorio = new Repositorio();

module.exports = function(app, cloudinary){

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
        let cam = caminho + "\\" + obj.Imagem;

        let call = function(erro){
            if(erro){
                res.send({status:500, message: erro});
            }else
                res.send({status:200, message: "Salvo com sucesso"});
        };

        if(obj["_id"] == ''){//Novo                       
            obj.Ativo = true;  

            cloudinary.uploader.upload(cam, function(result) { 
                obj.Imagem = result.url; 
                obj.Mudou = false;
                fs.unlink(cam);
                repositorio.Salvar("PortifolioItem",obj,function(ret){
                    call();
                }); 
            });
        }else{
            if(obj.Mudou == 'true'){
                cloudinary.uploader.upload(cam, function(result) { 
                    obj.Imagem = result.url; 
                    obj.Mudou = false;
                    fs.unlink(cam);
                    repositorio.Atualizar("PortifolioItem",obj,function(ret){
                        call();
                    }); 
                });
            }else{
                repositorio.Atualizar("PortifolioItem",obj,function(ret){
                    call();
                }); 
            }
            
        }
    });

    app.get('/Admin/Portifolio/ObterItem', function(req, res){
        repositorio.Obter("PortifolioItem", function(erro, dados){
            res.send(dados);
        });
    });
    app.delete('/Admin/Portifolio/DeletarItem', function(req, res){
        let id = req.body.id;
        repositorio.Deletar(id, "PortifolioItem", function(erro, result){
            if(erro)
                res.send({status:500, message: erro});
            else
                res.send({status:200, message: "Deletado com sucesso"});
        });
    });
    app.post('/Admin/Portifolio/AtivarOuDesativarItem', function(req, res){
        let id = req.body.id;
        let call = function(erro, result){
            if(erro)
                res.send({status:500, message: erro});
            else
                res.send({status:200, message: result}); 
        };

        repositorio.ObterDocumentoPorId("PortifolioItem", id, function(erro, row){
                        
            row.Ativo = !row.Ativo;
            repositorio.Atualizar("PortifolioItem",row,function(ret){
                call();
            });   
        });
    });

    app.post('/Admin/Portifolio/UploadFile',function(req, res){
        uploadPortifolio(req, res, function (err) {
            
        if (err)
            res.send({status:500, message :err});
        else
            res.send({status: 200, nomeArquivo : req.file.filename});
        });
    });
}