const express = require('express');
const DB = require('../helpers/db');
const RegistryManager = require('../helpers/registry');

const SchemaName = 'state';

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`${SchemaName} route`);
});

// create a new record object
router.post('/create', async (req, res) => {
    // obtain the record object fro the body of the request
    const object = req.body;

    try {
        const reply = await DB.Create(object, SchemaName);

        await RegistryManager.AddState(reply.National, reply.ID);

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
    const ID = req.params.id;

    try {
        const reply = await DB.Read({ ID }, SchemaName);
        if (reply) {
            res.status(200).send(reply[0]);
        } else {
            throw new Error('Database Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

// fetch records from the database matching query
router.post('/query', async (req, res) => {
    // obtain the query object from the body of the request
    const query = req.body;

    try {
        const reply = await DB.Read(query, SchemaName);
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

// fetch records from the database matching query
router.post('/add-local/:id', async (req, res) => {
    // obtain the query object from the body of the request
    const { LocalID } = req.body;

    try {
        const reply = await RegistryManager.AddState(req.params.id, LocalID);

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

// delete a record object from the database
router.delete('/delete/:id', async (req, res) => {
    // obtain the id of the record to delete
    const _id = req.params.id;

    try {
        const reply = await DB.Delete(_id, SchemaName);
        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error('Database Error!');
        }
    } catch (err) {
        console.error('SERVER ERROR', err.message);
        res.status(500).send({ message: 'Server Error!' });
    }
});

module.exports = router;
