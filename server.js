// const { request, response } = require('express');
const express = require('express');
const path = require('path');

const routes = require('./routes');

// express needs parenthesis bc it's something that's running
const app = express();

// This is the port that the application will be listening to. Usually, web
// servers are on port 80, but it's convention that Express servers are on
// 3000.
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// This is called 'middleware'
// It tells express to look in the static folder for each static request it recieves,
// and if it finds a match it will send it.
app.use(express.static(path.join(__dirname, './static')));

// Middleware
app.use('/', routes());

app.get('/speakers', (request, response) => {
    response.sendFile(path.join(__dirname, './static/speakers.html'));
});

// We need to start the server and tell it where to listen
app.listen(port, () => {
    // Called as soon as the port is listening
    console.log(`Express server listening on port ${port}.`);
});
