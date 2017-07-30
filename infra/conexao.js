var Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  MongoClient = require('mongodb').MongoClient;

exports.Conectar = function(cbConexao){    
    MongoClient.connect('mongodb://localhost:27017/queen', function(erro, dataBase){ 
        cbConexao(dataBase);
    });
};


