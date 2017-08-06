let Repositorio = require('../../infra/rep').Repositorio,
nomeObjeto = "Home";

let repositorio = new Repositorio();

exports.ListarHome = function(req, res){    
    repositorio.ObterComFiltro(nomeObjeto,{Ativo : true},function(erro,lista){
        res.send(lista);
    });
}