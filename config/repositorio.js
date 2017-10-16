var conexao = require('./conexao'),
    ObjectID = require("mongodb").ObjectID;

Repositorio = function() {};


Repositorio.prototype.Obter = function(nomeColecao, callback) {
  
  conexao.Conectar(function(db){
    db.collection(nomeColecao, function(error, collection) {    
      if( error ) callback(error);
      else {
        collection.find().toArray(function(err, itens){
            callback(null, itens);
            db.close();
        });      
      }
    });
  },function(erro){
    callback(erro, null)
  });  
};

Repositorio.prototype.ObterComFiltro = function(nomeColecao, filtro, callback) {
  
  conexao.Conectar(function(db){
    db.collection(nomeColecao, function(error, collection) {    
      if( error ) callback(error);
      else {
        collection.find(filtro).toArray(function(err, itens){
            callback(null, itens);
            db.close();
        });      
      }
    });
  });
};

Repositorio.prototype.Salvar = function(nomeEntidade, obj, callback) {
  conexao.Conectar(function(db){
    delete obj["_id"]; 
    db.collection(nomeEntidade).insert(obj,function(erro, col){      
        callback(erro);
        db.close();
    });
  });
};

Repositorio.prototype.Atualizar = function(nomeEntidade, obj, callback) {
  conexao.Conectar(function(db){
    var id = obj._id;
    delete obj["_id"]; 
    db.collection(nomeEntidade).update({_id: ObjectID(id)},obj,function(erro, col){      
        callback(erro);
        db.close();
    });
  });
};

Repositorio.prototype.Deletar = function(id, nomeEntidade, callback){
  conexao.Conectar(function(db){
    db.collection(nomeEntidade).remove({_id:ObjectID(id)},{safe:true},function(erro, result){
      callback(erro,result);
      db.close();
    });
  });
};

Repositorio.prototype.ObterQuantidade = function(nomeEntidade, filtro, callback){
  conexao.Conectar(function(db){    
    db.collection(nomeEntidade).count(filtro,function(err,qtd){
      callback(err,qtd);
      db.close();
    });
  });
}

Repositorio.prototype.ObterDocumentoPorId = function(nomeEntidade, id, callback){
  conexao.Conectar(function(db){
    db.collection(nomeEntidade).findOne({_id : ObjectID(id)},function(erro, row){
      callback(erro, row);
      db.close();
    });
  });
}

Repositorio.prototype.ObterUnicoDocumento = function(nomeEntidade, callback){
  conexao.Conectar(function(db){
    db.collection(nomeEntidade).findOne({},function(erro, row){
      callback(erro, row);
      db.close();
    });
  });
}
exports.Repositorio = Repositorio; 