let Repositorio = require('../../../config/repositorio').Repositorio,
multer  =   require('multer'),
nomeObjeto = "Home";

var storageHome =   multer.diskStorage({
  destination: function (req, file, callback) {
    let caminho = __dirname.substring(0, __dirname.length - '\servico\adm'.length - 1);  
    callback(null, caminho + '/html/src/images/backgroud');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

let uploadHome = multer({ storage : storageHome }).single('files');

let repositorio = new Repositorio();

function validarCadastro(estaAtivando, invalidaValidacao, call){
    repositorio.ObterQuantidade(nomeObjeto,{Ativo:true},function(erro,quantidade){
        if(quantidade == 3 && estaAtivando && !invalidaValidacao)
            call("Não é possível cadastrar mais de 3 itens ativos, desative ou delete algum da lista para prosseguir!");
        else call();
    });
    
}

module.exports = function(app){

    app.get('/Admin/Home/ObterListaHome', function(req, res){    
        repositorio.Obter(nomeObjeto,function(erro,lista){
            res.send(lista);
        })
    });

    app.post('/Admin/Home/CadastrarHome',function(req,res){

        let obj = req.body;
        let call = function(erro){
            if(erro){
                res.send({status:500, message: erro});
            }else
                res.send({status:200, message: "Salvo com sucesso"});
        };

        validarCadastro(true,(obj["_id"] != ''), function(erro){
            if(erro)
                call(erro);
            else{
                if(obj["_id"] == ''){//Novo
                    delete obj["_id"];    
                    obj.Ativo = true;  
                    repositorio.Salvar(nomeObjeto,obj,function(ret){
                        call();
                    }); 
                }else{
                    obj.Ativo = (obj.Ativo == 'true');
                    repositorio.Atualizar(nomeObjeto,obj,function(ret){
                        call();
                    })
                }
            }
        });
    });

    app.delete('/Admin/Home/Deletar',function(req,res){
        let id = req.body.id;
        repositorio.Deletar(id, nomeObjeto, function(erro, result){
            if(erro)
                res.send({status:500, message: erro});
            else
                res.send({status:200, message: "Deletado com sucesso"});
        });
    });

    app.post('/Admin/Home/AtivarOuDesativar', function(req, res){
        let id = req.body.id;
        let call = function(erro, result){
            if(erro)
                res.send({status:500, message: erro});
            else
                res.send({status:200, message: result}); 
        };

        repositorio.ObterDocumentoPorId(nomeObjeto, id, function(erro, row){
            validarCadastro(!row.Ativo,false,function(erro){
                if(erro)
                    call(erro);
                else{               
                    row.Ativo = !row.Ativo;
                    repositorio.Atualizar(nomeObjeto,row,function(ret){
                        call();
                    });
                }
            });
        });
    });

    app.post('/Admin/Home/UploadFile',function(req, res){
        uploadHome(req, res, function (err) {
        if (err)
            res.send({status:500, message :err});
        else
            res.send({status: 200, nomeArquivo : req.file.filename});
        });
    });
}


