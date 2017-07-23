var Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  mongo = require('mongodb').MongoClient

var db;

exports.obterConexao = function(){

    var db = new Db('test', new Server('localhost', 27017));
    

    //if(!db)
    //    db = mongodb.connect('mongodb://localhost:27017/queen');
    
    return db;
};

exports.CriarAlimentaBanco = function(){
    
    var db = new Db('queen', new Server('localhost', 27017));

    db.open();
    db.createCollection("aaa");
    db.close();

    
}