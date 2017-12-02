let Repositorio = require('../../../config/repositorio').Repositorio,
nomeObjeto = "Home",
ObjectID = require("mongodb").ObjectID,
fs = require('fs');

let repositorio = new Repositorio();

function validarCadastro(estaAtivando, invalidaValidacao, call){
    repositorio.ObterQuantidade(nomeObjeto,{Ativo:true},function(erro,quantidade){
        if(quantidade == 3 && estaAtivando && !invalidaValidacao)
            call("Não é possível cadastrar mais de 3 itens ativos, desative ou delete algum da lista para prosseguir!");
        else call();
    });
    
}

module.exports = function(app, cloudinary){

    app.get('/Adm/Home', function(req, res){    
        repositorio.Obter(nomeObjeto,function(erro,lista){
            if(erro){
                res.send({status:500, message: erro});
                
            }else
                res.send(lista);
        })
    });

    app.delete('/Adm/Home/:id/:idFoto',function(req,res){
        
        repositorio.Deletar(ObjectID(req.params.id), nomeObjeto, function(erro, result){
            if(erro)
                res.status(500).send(erro);
            else{
                cloudinary.uploader.destroy(req.params.idFoto);
                res.send({"mensagem" : "Deletado com sucesso"});
            }
        });
    });

    app.post('/Adm/BitPay',function(req,res){
        console.log(res);
        res.status(200).send();
    });

    app.get('/Adm/BitPay',function(req,res){
        console.log(res);
        res.status(200).send({"ok":"ok"});
    });

    app.post('/Adm/Home',function(req,res){ 

        let obj = req.body;
        let call = function(erro){
            if(erro){
                res.status(500).send(erro);
            }else
                res.send({"mensagem": "Salvo com sucesso"});
        };
        
        validarCadastro(true,(obj["_id"] != ''), function(erro){
            let cam = app.caminhoImagem + "/" + obj.Imagem;
            if(erro)
                call(erro);
            else{
                if(obj["_id"] == ''){//Novo                       
                    obj.Ativo = true;  
                    

                    cloudinary.uploader.upload(cam, function(result) { 
                        console.log(result);
                        obj.Imagem = result.url; 
                        obj.Mudou = false;
                        obj.idFoto = result.public_id;
                        fs.unlink(cam);
                        repositorio.Salvar(nomeObjeto,obj,function(ret){
                            call();
                        }); 
                    });                    
                     
                }else{

                    if(obj.Mudou){

                        cloudinary.uploader.upload(cam, function(result) { 
                            
                            cloudinary.uploader.destroy(obj.idFoto);

                            obj.Imagem = result.url; 
                            obj.Mudou = false;
                            obj.idFoto = result.public_id;
                            fs.unlink(cam);
                            repositorio.Atualizar(nomeObjeto,obj,function(ret){
                                call();
                            }); 
                        });
                    }else{
                        obj.Ativo = (obj.Ativo == 'true');
                        repositorio.Atualizar(nomeObjeto,obj,function(ret){
                            call();
                        });
                    }
                }
            }
        });
    });
    
    app.put('/Adm/Home/AtivaDesativa/:id', function(req, res){
        let id = ObjectID(req.params.id);
        let call = function(erro, result){
            if(erro)
                res.status(500).send(erro);
            else
                res.send({"mensagem" : "Atualizado com sucesso"}); 
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
    
}


