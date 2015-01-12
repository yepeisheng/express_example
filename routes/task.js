var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://peisheng:jpyps5218@ec2-54-169-141-38.ap-southeast-1.compute.amazonaws.com/db');

var TaskSchema = mongoose.Schema({
	  task: String
    }, {collection: "task"});

var Task = mongoose.model('Task', TaskSchema);
	
router.get('/', function(req, res) {
  Task.find(function(err, docs){
      res.render('tasks/index', {
        title: "Todos index view",
        docs: docs
      });
    });
  //db.on('error', renderNoTask(req, res));
 
  //db.once("open", function(callback){});

});

router.get('/:id/edit', function(req,res){
  Task.findById(req.params.id, function(err, doc){
    res.render('tasks/edit', {
	  title: 'Edit Task View',
	  task: doc
	});
  });
});

router.post('/edit/:id', function(req, res){
  console.log('method called!');
  Task.findById(req.params.id, function(err, doc){
    doc.task = req.body.taskName;
	doc.save(function(err){
	  res.redirect('/task/');
	});
  });
});

router.post('/', function(req, res) {
  console.log(req.body.taskName);
  var task = new Task({ task: req.body.taskName});
  task.save(function(err){
    if (!err) {
	  res.redirect('/task');
	} else {
	  res.redirect('/task/new');
	}
  });
});  
  
router.get('/new', function(req, res){
  res.render('tasks/new.jade', {
    title: 'New Task'
  });
});  
  
function renderNoTask(req, res){
  res.render('tasks/index', {
    title: "Tods index view",
	docs: []
  });
}

module.exports = router;
