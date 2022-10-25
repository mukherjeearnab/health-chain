const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// get
router.get('/get/:id', async (req, res) => {
    // obtain the id of the record to update
    const AadhaarID = req.params.id;

    try {
        const reply = await Functions.Stateful.PHI.Read(AadhaarID);
        if (reply.status === 404) res.status(404).send({ message: 'PHI not found!' });
        else res.status(200).send(reply.data);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// create
router.post('/create', async (req, res) => {
    // obtain the record object from the body of the request
    const object = req.body;

    try {
        const reply = await Functions.Stateful.PHI.Create(object);
        if (reply.status === 403) res.status(403).send({ message: 'PHI already exists!' });
        else res.status(201).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// update
router.post('/update/:id', async (req, res) => {
    // obtain the id of the record to update
    const AadhaarID = req.params.id;
    // obtain the updated object from the body of the request
    const object = { ...req.body, AadhaarID };

    try {
        const reply = await Functions.Stateful.PHI.Update(object);
        if (reply.status === 404) res.status(404).send({ message: 'PHI does not exists!' });
        else res.status(201).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// create
router.post('/add-state/:id', async (req, res) => {
    // obtain the id of the record to update
    const AadhaarID = req.params.id;
    // obtain the updated object from the body of the request
    const { StateID } = req.body;

    try {
        const reply = await Functions.Stateful.PHI.AddState(AadhaarID, StateID);
        if (reply.status === 404) res.status(404).send({ message: 'PHI does not exists!' });
        else res.status(201).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
