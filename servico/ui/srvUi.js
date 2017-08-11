let Repositorio = require('../../infra/rep').Repositorio,
nomeObjeto = "Home";

let repositorio = new Repositorio();
module.exports = function(app){

    app.get('/Ui/Home/ObterHome',function(req, res){    
        repositorio.ObterComFiltro(nomeObjeto,{Ativo : true},function(erro,lista){
            res.send(lista);
        });
    });

}