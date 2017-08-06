var Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  MongoClient = require('mongodb').MongoClient;

exports.Conectar = function(cbConexao){    
    MongoClient.connect('mongodb://flvlz:123mudar@mongo_queen:27017/queen', function(erro, dataBase){ 
        cbConexao(dataBase);
    });
};


