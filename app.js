var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/');
var bodyparser = require('body-parser');

var app = express();

// logging
app.use(morgan('dev'));

// Parsing URL and JSON
app.use(bodyparser.urlencoded( {extended: false} ));
app.use(bodyparser.json());

// Using the routes folder
app.use('/', routes);
app.use(express.static(__dirname + '/public'));


// Integration to swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Disabling swig caching
swig.setDefaults({ cache: false });


var server = app.listen(3000, function () {
    console.log('server listening');
});