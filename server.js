const { request, response } = require('express');
const express = require('express');

// express needs parenthesis bc it's something that's running
const app = express();

// This is the port that the application will be listening to. Usually, web
// servers are on port 80, but it's convention that Express servers are on
// 3000.
const port = 3000;

// We need a route to open in the browser.
// app.get("this is for the slash route, so that's the index route", callback)
app.get('/', (request, response) => {
    response.send('Hello Express :)');
});

// We need to start the server and tell it where to listen
app.listen(port, () => {
    // Called as soon as the port is listening
    console.log(`Express server listening on port ${port}.`)
})