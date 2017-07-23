var conexao = require('./conexao');

exports.getColecao = function(nomeColecao){
    return conexao.obterConexao().collection(nomeColecao);
};

exports.InicializaBanco = function(){
    conexao.CriarAlimentaBanco();
}