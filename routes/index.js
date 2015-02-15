module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var tweetBank = require('../tweetBank');

    router.get('/', function (req, res) {
        var tweets = tweetBank.list();
        res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, user: 'Nimit Maru' });
    });

    router.get('/users/:name', function (req, res) {
        var name = req.params.name;
        var list = tweetBank.find( {name: name} );
        res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, showForm: true, user: name});
    });

    router.get('/users/:name/tweets/:id', function (req, res) {
        var name = req.params.name;
        var id = Number(req.params.id);
        var tweet = tweetBank.find( {id: id, name: name} );
        res.render( 'index', { title: 'Tweet by ' + name, tweets: tweet, showForm: false, user: name});
    });

    router.post('/submit', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;
        tweetBank.add(name, text);
        var tweet = tweetBank.find( { name: name, text: text })[0];
        io.sockets.emit('new_tweet', tweet);
        res.redirect('/');
    });
    return router;
};