const express = require('express');

const EventStoreContract = require('../../../fabric/contracts/log_cc');

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`log_cc route`);
});

router.get('/get/:HealthID', async (req, res) => {
    try {
        const { exec, result } = await EventStoreContract.GetEventStore(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.HealthID]
        );

        if (exec === true) res.status(200).send(result);
        else res.status(404).send({ message: 'EventStore NOT found!' });
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

router.post('/add-log', async (req, res) => {
    const { HealthID, EventType, From, To } = req.body;

    try {
        const { exec, result } = await EventStoreContract.AddEvent(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [HealthID, EventType, new Date().valueOf().toString(), From, To]
        );

        if (exec === true) res.status(200).send({ result, message: 'Event Logged Successfully.' });
        else throw new Error('Chaincode Error! Check API Server logs.');
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

module.exports = router;
