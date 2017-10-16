let Repositorio = require('../../../config/repositorio').Repositorio,
nomeObjeto = "Home";

let repositorio = new Repositorio();

function validarCadastro(estaAtivando, invalidaValidacao, call){
    repositorio.ObterQuantidade(nomeObjeto,{Ativo:true},function(erro,quantidade){
        if(quantidade == 3 && estaAtivando && !invalidaValidacao)
            call("Não é possível cadastrar mais de 3 itens ativos, desative ou delete algum da lista para prosseguir!");
        else call();
    });
    
}

module.exports = function(app, cloudinary){

    app.get('/Home', function(req, res){    
        repositorio.Obter(nomeObjeto,function(erro,lista){
            if(erro){
                res.send({status:500, message: erro});
                
            }else
                res.send({status:200, message: "Salvo com sucesso"});
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
                    obj.Ativo = true;  
                    let cam = app.caminhoImagem + "/" + obj.Imagem;

                    let callUpload = function(result){
                        obj.Imagem = result.url;                         
                        repositorio.Salvar(nomeObjeto,obj,function(ret){
                            call();
                        });
                    }

                    cloudinary.upload(cam, callUpload);
                     
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
        else{
            res.send({status: 200, nomeArquivo : req.file.filename});
        }
        });
    });
}


