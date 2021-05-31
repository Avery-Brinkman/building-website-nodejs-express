const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
    const { feedbackService } = params;

    router.get('/', async (request, response, next) => {
        try {
            const feedback = await feedbackService.getList();

            // const errors = request.session.feedback.errors if request.session.feedback exists, else = false
            const errors = request.session.feedback ? request.session.feedback.errors : false;

            const successMessage = request.session.feedback
                ? request.session.feedback.message
                : false;

            // After storing the errors, reset the state
            request.session.feedback = {};

            return response.render('layout', {
                pageTitle: 'Feedback',
                template: 'feedback',
                feedback,
                errors,
                successMessage,
            });
        } catch (err) {
            return next(err);
        }
    });

    router.post(
        '/',
        [
            check('name') // Check name
                .trim() // Trims whitespace
                .isLength({ min: 3 }) // Ensures name is at least 3 letters
                .escape() // Escaping to make sure there is no HTML and JavaScript embedded in entry
                .withMessage('A name is required'), // Message returned if something is wrong
            check('email')
                .trim()
                .isEmail() // Checks if email is real
                .normalizeEmail() // Formats email
                .escape()
                .withMessage('A valid email address is required'),
            check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
            check('message')
                .trim()
                .isLength({ min: 5 })
                .escape()
                .withMessage('A message is required'),
        ],
        async (request, response, next) => {
            try {
                const errors = validationResult(request);

                if (!errors.isEmpty()) {
                    // Stores to variable called feedback on session object
                    request.session.feedback = {
                        errors: errors.array(),
                    };

                    return response.redirect('/feedback');
                }

                const { name, email, title, message } = request.body;
                await feedbackService.addEntry(name, email, title, message);

                request.session.feedback = {
                    message: 'Thank you for your feedback!',
                };
                return response.redirect('/feedback');
            } catch (err) {
                return next(err);
            }
        }
    );

    return router;
};
