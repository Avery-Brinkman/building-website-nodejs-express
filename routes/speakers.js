const express = require('express');

const router = express.Router();

// Returns this function
module.exports = (params) => {
    // const speakersService = params.speakersService; OR
    const { speakersService } = params;

    // Don't need /speakers because it's only sent here if it matches /speakers
    router.get('/', async (request, response) => {
        const speakers = await speakersService.getList();

        response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
    });

    router.get('/:shortname', async (request, response) => {
        const speaker = await speakersService.getSpeaker(request.params.shortname);
        const speakerArt = await speakersService.getArtworkForSpeaker(request.params.shortname);
        response.render('layout', {
            pageTitle: speaker.name,
            template: 'speakers-detail',
            speaker,
            speakerArt,
        });
    });

    return router;
};
