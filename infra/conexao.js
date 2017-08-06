var Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  MongoClient = require('mongodb').MongoClient;

exports.Conectar = function(cbConexao){    
    MongoClient.connect('mongodb://mongo_queen:27017', function(erro, dataBase){ 
        cbConexao(dataBase);
    });
};


