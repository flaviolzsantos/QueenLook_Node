let Repositorio = require('../../../config/repositorio').Repositorio,
nomeObjeto = "Portifolio";

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
            repositorio.Salvar(nomeObjeto,obj,function(ret){
                call();
            }); 
        }else{            
            repositorio.Atualizar(nomeObjeto,obj,function(ret){
                call();
            })
        }
    });

    app.get('/Admin/Portifolio/ObterPortifolio', function(req, res){    
        repositorio.Obter(nomeObjeto,function(erro,lista){
            res.send(lista);
        })
    });
}