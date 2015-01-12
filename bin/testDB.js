//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/db');
//
//var db = mongoose.connection;
//db.on('error', console.error.bind('connection error:'));
//db.once('open', function(callback){
//  var kittySchema = mongoose.Schema({
//    name: String
//  });
//  
//  kittySchema.methods.speak = function(){
//    var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
//    return greeting;
//  };
//  var Kitten = mongoose.model('Kitten', kittySchema);
//  
//  Kitten.find(function(err, kittens){
//    for(k=0; k<kittens.length; k++){
//      console.log(kittens[k].name + kittens[k].speak());
//    }
//  });
//  
//});

//var mysql = require('mysql');
//var pool = mysql.createPool({
//  host : 'toyonamazon.cmviteue1lwt.ap-southeast-1.rds.amazonaws.com',
//  user : 'peisheng',
//  password : 'jpyps5218',
//  database: 'test'
//});
//
//pool.getConnection(function(err, connection){
//  connection.query("SELECT * FROM task", function(err, rows){
//    for (i=0; i<rows.length; i++) {
//      console.log("task " + i + ", " + rows[i].task);
//    }
//    connection.release();
//  });
//});

var mongoose = require('mongoose');
mongoose.connect('mongodb://peisheng:jpyps5218@ec2-54-169-141-38.ap-southeast-1.compute.amazonaws.com/db');

var db = mongoose.connection;
db.on('error', console.error.bind('connection error:'));
db.once('open', function(callback){
  var kittySchema = mongoose.Schema({
    name: String
  }, {collection: "kitten"});
  
  kittySchema.methods.speak = function(){
    var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
    return greeting;
  };
  var Kitten = mongoose.model('Kitten', kittySchema);
  console.log("before find");
  Kitten.find(function(err, kittens){
    console.log("find returned");
    if (err) {
      console.log("error: " + err.stack);
    } else {
      console.log("query successed! with data rows: " + kittens.length);
      for(k=0; k<kittens.length; k++){
        console.log(kittens[k].name + kittens[k].speak());
      }
    }
  });
  console.log("after find");
});
