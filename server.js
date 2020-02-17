const express = require('express');
const bodyParser = require('body-parser');


var port = 9000;
var app = express();

// angular files location
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                         


//listening to app
app.listen(port);
console.log("Nodejs Server started on port:", port);            