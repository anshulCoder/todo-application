const express = require('express');
const bodyParser = require('body-parser');
var Todo = require('./controllers/todos');


var port = 9000;
var app = express();

// angular files location
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());


/*  "/todos"
 *    GET: finds all todos
 */

app.get("/todos", Todo.get_all_todos);


/*  "/todos"
 *    POST: create a todo
 */

app.post("/todos", Todo.validate, Todo.create_todo);


//listening to app
app.listen(port, () => {
	console.log("Nodejs Server started on port:", port);
});