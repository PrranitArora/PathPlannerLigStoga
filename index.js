var express = require('express');
var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define routes
app.get('/', function (req, res) {
    res.render('homepg');
});

app.get('/mainmenu', function (req, res) {
    res.render('mainmenu');
});

app.get('/maincppgen', function (req, res) {
    res.render('maincppgen');
});

app.get('/pathCreating', function (req, res) {
    res.render('pathCreating');
});

app.get('/settings', function (req, res) {
    res.render('settings');
});

app.listen(8081, function () {
    console.log('Simple Web Application running on port 8081!');
});
