const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

// express needs parenthesis bc it's something that's running
const app = express();
const http = require('http').Server(app);

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

// const routes = require('./routes/index.js');
const routes = require('./routes');

// This is the port that the application will be listening to. Usually, web servers are on port 80,
// but it's convention that Express servers are on 3000.
const port = 3000;

// Makes express trust cookies that are passed through a reverse proxy
app.set('trust proxy', 1);

app.use(
    cookieSession({
        name: 'session',
        keys: ['UQ9fc5yoEn', 'OUWXb30Ppk'],
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Sets variable siteName on creation
app.locals.siteName = 'ROUX Meetups';

// This is called 'middleware'. It tells express to look in the static folder for each static
// request it recieves, and if it finds a match it will send it.
app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
    try {
        const names = await speakersService.getNames();
        response.locals.speakerNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
});

// Middleware
app.use(
    '/',
    routes({
        feedbackService,
        speakersService,
    })
);

// We will only end up here if no route was found in our routing immediatley above this
app.use((request, response, next) => next(createError(404, 'Page not found.')));

/* Telling Express which function to use to handle errors. It knows that it should be handling
 * errors because it takes 4 arguments (the 1st being the error). */
app.use((err, request, response, next) => {
    response.locals.message = err.message;

    // eslint-disable-next-line no-console
    console.error(err);

    // status = err.status, or 500 (internal server error) if err.status DNE
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
    next();
});

// We need to start the server and tell it where to listen
http.listen(port, () => {
    // Called as soon as the port is listening

    // eslint-disable-next-line no-console
    console.log(`Express server listening on port ${port}.`);
});
