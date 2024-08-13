const express = require('express');
const DB = require('../helpers/db');

const SchemaName = 'hie';

const router = new express.Router();

// create a new record object
router.post('/create', async (req, res) => {
    // obtain the record object fro the body of the request
    const object = req.body;

    try {
        const reply = await DB.Create({ username: object.username }, object, SchemaName);
        if (reply) {
            res.status(201).send(reply);
        } else {
            throw new Error('Database Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// fetch a record object from the database
router.get('/get/:id', async (req, res) => {
    // obtain the AadhaarID object from the params
    const Username = req.params.id;

    try {
        const reply = await DB.Read({ Username }, SchemaName);

        if (reply) {
            // if length of reply is 0, account not found
            if (reply.length === 0) res.status(404).send({ message: 'Account Not Found!' });

            // else return the 0th element of the response
            res.status(200).send(reply[0]);
        } else {
            throw new Error('Database Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// update a record with _id matching
router.post('/update/:id', async (req, res) => {
    // obtain the id of the record to update
    const _id = req.params.id;
    // obtain the updated object from the body of the request
    const object = req.body;

    try {
        const reply = await DB.Update(_id, object, SchemaName);
        if (reply) {
            res.status(200).send(reply);
        } else {
            throw new Error('Database Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
