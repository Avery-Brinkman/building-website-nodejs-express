const express = require('express');

const router = express.Router();

// Returns this function
module.exports = (params) => {
    // const speakersService = params.speakersService; OR
    const { speakersService } = params;

    // Don't need /speakers because it's only sent here if it matches /speakers
    router.get('/', async (request, response) => {
        const speakers = await speakersService.getList();
        return response.json(speakers);
    });
    router.get('/:shortname', (request, response) =>
        response.send(`Detail page of ${request.params.shortname}`)
    );

    return router;
};
