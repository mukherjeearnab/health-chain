const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// hie login
router.post('/login', async (req, res) => {
    // obtain the username, password and group from the body of the request
    const { username, password, group } = req.body;

    try {
        const reply = await Functions.Stateful.HIE.Login(username, password, group);
        if (reply.status === 401) res.status(401).send({ message: 'Unauthorised' });
        else if (reply.status === 404) res.status(404).send({ message: 'Not Found' });
        else res.status(200).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// hie signup
router.post('/signup', async (req, res) => {
    // obtain the username, password and group from the body of the request
    const { username, password, group } = req.body;

    try {
        const reply = await Functions.Stateful.HIE.Signup(username, password, group);
        res.status(204).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// check hie token status
router.post('/check', Functions.Stateful.HIE.Middleware, async (req, res) => {
    res.status(200).send({ message: 'HIE Authentication Successful!' });
});

module.exports = router;
