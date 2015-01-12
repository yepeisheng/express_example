var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://peisheng:jpyps5218@ec2-54-169-141-38.ap-southeast-1.compute.amazonaws.com/db');

var TaskSchema = mongoose.Schema({
	  task: { type: String, validate: [validatePresenceOf, 'a task is required']}
    }, {collection: "task"});

var Task = mongoose.model('Task', TaskSchema);

// Get Request to the page to view all tasks.
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

// Get Request to the page to add new task.
router.get('/new', function(req, res){
  res.render('tasks/new.jade', {
    title: 'New Task'
  });
});

// Post Request to save a new task.
router.post('/', function(req, res) {
  var task = new Task({ task: req.body.taskName});
  task.save(function(err){
    if (!err) {
      req.flash('info', 'Task Created!');
	    res.redirect('/task');
	  } else {
	    res.redirect('/task/new');
	  }
  });
});

function validatePresenceOf(value){
  return value && value.length;
}  

// Get Request to the page to edit a task.
router.get('/:id/edit', function(req,res){
  Task.findById(req.params.id, function(err, doc){
    res.render('tasks/edit', {
	  title: 'Edit Task View',
	  task: doc
	});
  });
});

// Post Request to save the change of task.
router.post('/edit/:id', function(req, res){
  Task.findById(req.params.id, function(err, doc){
    doc.task = req.body.taskName;
	doc.save(function(err){
	  res.redirect('/task/');
	});
  });
});

// Post Request to delete a task.
router.post('/:id/delete', function(req, res){
  Task.findById(req.params.id, function(err, doc){
    if (!doc) return next(new NotFound('Document not found'));
    doc.remove(function(){
      req.flash('info', 'Task ' + doc.task +' deleted.');
      res.redirect('/task');
    });
  });
});
  

  
function renderNoTask(req, res){
  res.render('tasks/index', {
    title: "Tods index view",
	docs: []
  });
}

module.exports = router;
