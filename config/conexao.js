var Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  MongoClient = require('mongodb').MongoClient,
  app = require('./app.js');

exports.Conectar = function(cbConexao, cbErro){    
    if(app.prod){
        MongoClient.connect('mongodb://flvlz:123mudar@mongo_queen:27017/queen', function(erro, dataBase){ 
            cbConexao(dataBase);
        });
    }else{        
        MongoClient.connect('mongodb://localhost:27017/queen', function(erro, dataBase){ 
            if(erro)
                cbErro(erro);
            else
                cbConexao(dataBase, erro);
        });
    }
    
};


