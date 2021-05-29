const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

// Returns this function
module.exports = () => {
    // We need a route to open in the browser.
    // app.get("this is for the slash route, so that's the index route", callback)
    router.get('/', (request, response) => {
        // When the app gets a request, we will send a file to response (response.sendFile)
        // The file we want to send is located in CurrentDirectory/static/index.html
        // __dirname is CurrentDirectory
        // response.sendFile(path.join(__dirname, './static/index.html'));
        response.render('pages/index', { pageTitle: 'Welcome' });
    });

    // For everything matching the /speakers route, use speakersRoute
    router.use('/speakers', speakersRoute());
    router.use('/feedback', feedbackRoute());

    return router;
};
