const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// allow consent
router.post('/allow/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate } = req.body;

    try {
        const reply = await Functions.Stateful.Consent.Allow(AadhaarID, Candidate);
        res.status(204).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// revoke consent
router.post('/revoke/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate } = req.body;

    try {
        const reply = await Functions.Stateful.Consent.Revoke(AadhaarID, Candidate);
        res.status(204).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// check consent
router.post('/check/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate } = req.body;

    try {
        const reply = await Functions.Stateful.Consent.Check(AadhaarID, Candidate);
        res.status(201).send({ concentGranted: reply });
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// request consent
router.post('/request/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate, Message } = req.body;

    try {
        const reply = await Functions.Stateful.Consent.Request(AadhaarID, Candidate, Message);
        res.status(204).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
