var Repositorio = require('../../infra/rep').Repositorio
let nomeObjeto = "Home";

var repositorio = new Repositorio();

exports.Listar = function(call){    
    repositorio.Obter(call,nomeObjeto);
}

exports.Salvar = function(obj,call){
    console.log('antes validar');
    validarCadastro(true,(obj["_id"] != ''), function(erro){
        console.log('depois validar');
        if(erro)
            call(erro);
        else{
            console.log('antes novo');
            if(obj["_id"] == ''){//Novo
                delete obj["_id"];    
                obj.Ativo = true;  
                console.log('entrou novo');      
                repositorio.Salvar(nomeObjeto,obj,function(ret){
                    console.log('salvou');
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
}

exports.Deletar = function(id, call){
    repositorio.Deletar(id, nomeObjeto, function(erro, result){
        call(erro,result);
    });
}

exports.AtivarOuDesativar = function(id, call){
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
}

function validarCadastro(estaAtivando, invalidaValidacao, call){
    repositorio.ObterQuantidade(nomeObjeto,{Ativo:true},function(erro,quantidade){
        if(quantidade == 3 && estaAtivando && !invalidaValidacao)
            call("Não é possível cadastrar mais de 3 itens ativos, desative ou delete algum da lista para prosseguir!");
        else call();
    });
    
}

