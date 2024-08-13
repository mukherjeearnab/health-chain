const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// get
router.get('/get/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the id of the record to update
    const AadhaarID = req.params.id;

    try {
        const reply = await Functions.Stateful.EMR.Read(AadhaarID);
        if (reply.status === 404) res.status(404).send({ message: 'EMR not found!' });
        else res.status(200).send(reply.data);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// add local
router.post('/add-record/:id', Functions.Stateful.HIE.Middleware, async (req, res) => {
    // obtain the id of the record to update
    const AadhaarID = req.params.id;
    // obtain the updated object from the body of the request
    const { Record } = req.body;

    try {
        const reply = await Functions.Stateful.EMR.AddRecord(AadhaarID, Record);
        if (reply.status === 404) res.status(404).send({ message: 'EMR does not exists!' });
        else res.status(201).send(reply);
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
