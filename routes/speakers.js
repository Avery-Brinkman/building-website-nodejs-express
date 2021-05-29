const express = require('express');

const router = express.Router();

// Returns this function
module.exports = () => {
    // Don't need /speakers because it's only sent here if it matches /speakers
    router.get('/', (request, response) => response.send('Speakers list'));

    router.get('/:shortname', (request, response) =>
        response.send(`Detail page of ${request.params.shortname}`)
    );

    return router;
};
