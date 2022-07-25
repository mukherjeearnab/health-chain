const express = require("express");
const DB = require("../helpers/db");

const SchemaName = "consent";

const router = new express.Router();

// fetch a consent object from the database
router.get("/get/:id", async (req, res) => {
    // obtain the AadhaarID object from the params
    const AadhaarID = req.params.id;

    try {
        const reply = await DB.Read({ AadhaarID }, SchemaName);
        if (reply) {
            res.status(200).send(reply[0]);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

// allow consent for given requester and phi
router.post("/allow/:id", async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate } = req.body;

    try {
        // obtain the PHI of the record to add concent to
        const document = (await DB.Read({ AadhaarID }, SchemaName))[0];
        // Add the Requester's ID and set the Action (True = Consent Granted, False = Revoked)
        document.Consent.set(Candidate, true);
        // Update Consent
        const reply = await DB.Update(document._id, document, SchemaName);

        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

// revoke consent of given AadhaarID
router.post("/revoke/:id", async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate } = req.body;

    try {
        // obtain the PHI of the record to add concent to
        const document = (await DB.Read({ AadhaarID }, SchemaName))[0];
        // Add the Requester's ID and set the Action (True = Consent Granted, False = Revoked)
        document.Consent.set(Candidate, false);
        // Update Consent
        const reply = await DB.Update(document._id, document, SchemaName);

        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

// allow consent for given requester from list of consent requests
router.post("/new-request/:id", async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { Candidate, Message } = req.body;

    try {
        // obtain the PHI of the record to add concent to
        const document = (await DB.Read({ AadhaarID }, SchemaName))[0];
        // Add the Requester's ID and Message, and add a timestamp of the request
        document.ConsentRequests.push({
            timestamp: +new Date(),
            Requester: Candidate,
            message: Message,
        });
        // Update Consent object
        const reply = await DB.Update(document._id, document, SchemaName);

        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

// allow consent for given requester from list of consent requests
router.post("/allow-request/:id", async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { RequesterIndex } = req.body;

    try {
        // obtain the PHI of the record to add concent to
        const document = (await DB.Read({ AadhaarID }, SchemaName))[0];
        // Add the Requester's ID and set the Action (True = Consent Granted, False = Revoked)
        document.Consent.set(document.ConsentRequests[RequesterIndex].Requester, true);
        // set request to allowed, recording the timestamp
        document.ConsentRequests[RequesterIndex].status.allowed = true;
        document.ConsentRequests[RequesterIndex].status.timestamp = +new Date();
        // Update Consent
        const reply = await DB.Update(document._id, document, SchemaName);

        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

// revoke consent for given requester from list of consent requests
router.post("/revoke-request/:id", async (req, res) => {
    // obtain the ID of the PHI
    const AadhaarID = req.params.id;

    // obtain the Requester and Action from the body of the request
    const { RequesterIndex } = req.body;

    try {
        // obtain the PHI of the record to add concent to
        const document = (await DB.Read({ AadhaarID }, SchemaName))[0];
        // Add the Requester's ID and set the Action (True = Consent Granted, False = Revoked)
        document.Consent.set(document.ConsentRequests[RequesterIndex].Requester, false);
        // set request to allowed, recording the timestamp
        document.ConsentRequests[RequesterIndex].status.allowed = false;
        document.ConsentRequests[RequesterIndex].status.timestamp = +new Date();
        // Update Consent
        const reply = await DB.Update(document._id, document, SchemaName);

        if (reply) {
            res.status(204).send(reply);
        } else {
            throw new Error("Database Error!");
        }
    } catch (err) {
        console.error("SERVER ERROR", err.message);
        res.status(500).send({ message: "Server Error!" });
    }
});

module.exports = router;
