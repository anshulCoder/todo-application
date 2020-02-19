const config = require('../config/production');
const { body, validationResult } = require('express-validator');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var db;
const client = new MongoClient(config.mongodb_config.connection_url, { useNewUrlParser: true });
client.connect(err => {
	if (err) {
    	console.log(`Error: ${err}`);
    	process.exit(1);
  	}
	db = client.db(config.mongodb_config.db_name);
  	console.log("Connnected to DB");
});

exports.get_all_todos = (req, res, next) => {
	db.collection(config.TODO_COLLECTION).find({
		deleted_at: null
	}).sort({task_due_date: 1}).toArray(function(err, docs) {
		if (err) {
			res.status(500).json({status: false, error_msg: "Failed to fetch tasks"});
	    } else {
	     	res.status(200).json({status: true, task_list: docs});
	    }
	});
}

exports.create_todo = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ status: false,  error_msg: errors.array().map((e) => { return e['msg'];}).join("<br>") });
	var new_todo = req.body;
	new_todo.task_status = 0;
	new_todo.deleted_at = null;
	new_todo.created_at = new Date();
	db.collection(config.TODO_COLLECTION).insertOne(new_todo, function(err, doc) {
    	if (err) {
    		res.status(500).json({status: false, error_msg: err.message});
      	} else {
      		res.status(200).json({status: true, task_data: doc.ops[0]});
      	}
    });
}

exports.mark_task_complete = (req, res, next) => {
	var task_id = req.params.task_id;
	db.collection(config.TODO_COLLECTION).updateOne(
		{_id: ObjectID(task_id)},
		{$set: {task_status: 1}}
	, function(err, doc) {
		if (err) {
    		res.status(500).json({status: false, error_msg: "Failed to mark task as complete"});
      	} else {
      		res.status(200).json({status: true});
      	}
	})
}

exports.soft_delete_task = (req, res, next) => {
	var task_id = req.params.task_id;
	db.collection(config.TODO_COLLECTION).updateOne(
		{_id: ObjectID(task_id)},
		{$currentDate: {deleted_at: true}}
	, function(err, doc) {
		if (err) {
    		res.status(500).json({status: false, error_msg: "Failed to delete task"});
      	} else {
      		res.status(200).json({status: true});
      	}
	})
}

exports.validate = [
		body("task_name", "Task name is required!").notEmpty(),
		body("task_description", "Task description is required!").notEmpty(),
		body("task_due_date", "Valid Task due date is required!").notEmpty().withMessage("Task due date is required!").custom((value, {req}) => isNaN(value) && !isNaN(Date.parse(value)))
];