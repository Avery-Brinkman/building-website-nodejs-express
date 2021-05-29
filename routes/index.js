const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

// Returns this function
module.exports = (params) => {
    const { speakersService } = params;

    // We need a route to open in the browser.
    // app.get("this is for the slash route, so that's the index route", callback)
    router.get('/', async (request, response) => {
        const topSpeakers = await speakersService.getList();

        // When the app gets a request, we will send a file to response (response.sendFile)
        // The file we want to send is located in CurrentDirectory/static/index.html
        // __dirname is CurrentDirectory
        // response.sendFile(path.join(__dirname, './static/index.html'));
        response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
    });

    // For everything matching the /speakers route, use speakersRoute
    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
};
