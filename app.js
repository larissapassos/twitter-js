var express = require('express');
var morgan = require('morgan');
var swig = require('swig');

var app = express();

// logging
app.use(morgan('dev'));

// Integration to swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Disabling swig caching
swig.setDefaults({ cache: false });


var server = app.listen(3000, function () {
    console.log('server listening');
});

app.get('/', function (req, res) {
    var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
    res.render('index', {title: 'Hall of Fame', people: people});
});

app.get('/news', function (req, res) {
    res.send('olar.mundo');
});