let Repositorio = require('../../../config/repositorio').Repositorio;

let repositorio = new Repositorio();
module.exports = function(app){

    app.get('/Ui/Home/ObterHome',function(req, res){    
        repositorio.ObterComFiltro("Home",{Ativo : true},function(erro,lista){
            res.send(lista);
        });
    });

    app.get('/Ui/Portifolio/ObterPortifolio',function(req, res){    
        repositorio.ObterUnicoDocumento("Portifolio", function(erro,lista){
            res.send(lista);
        });
    });

}