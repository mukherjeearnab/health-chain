const express = require('express');
const Functions = require('../helpers/functions');

const router = new express.Router();

// fetch a record object from the database
router.get('/get/:id', async (req, res) => {
    // obtain the AadhaarID object from the params
    const AadhaarID = req.params.id;

    try {
        const reply = await Functions.Stateful.HealthLocker.Get(AadhaarID);

        if (reply) {
            res.status(200).send(reply);
        } else {
            throw new Error('Function Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
