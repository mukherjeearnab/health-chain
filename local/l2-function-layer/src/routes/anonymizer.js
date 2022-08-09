const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// anonymizer route
router.post('/anonymize', async (req, res) => {
    // obtain the record object fro the body of the request
    const object = req.body;

    try {
        // Check if object or array, and handle accordingly
        let reply = {};
        if (Array.isArray(object)) {
            reply = object.map(Functions.Stateless.Anonymizer);
        } else {
            reply = Functions.Stateless.Anonymizer(object);
        }

        // send the response with anonmyzed object
        res.status(201).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
