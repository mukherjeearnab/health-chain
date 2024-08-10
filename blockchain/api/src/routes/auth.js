const express = require('express');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWTConfig = require('../helpers/jwtConfig');
const FabricAPI = require('../../fabric/api');

const router = new express.Router();

// Login JWT Route
router.post('/api/auth/login', (req, res) => {
    const { Username, Password } = req.body;
    const Passhash = sha256(Password);

    try {
        User.findOne({ Username }, (err, doc) => {
            if (err || doc == null) res.sendStatus(404);
            if (doc.Passhash === Passhash) {
                const userdata = {
                    Username,
                    Passhash,
                    OrgName: process.env.ORG_NAME
                };
                const token = jwt.sign(userdata, JWTConfig.secretKey, {
                    algorithm: JWTConfig.algorithm,
                    expiresIn: process.env.JWT_EXPIRATION
                });
                res.status(200).send({
                    message: 'Login Successful!',
                    jwtoken: token
                });
            } else {
                res.status(401).send({
                    message: 'Login Failed!'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Server Error!'
        });
    }
});

// Sign Up JWT Route
router.post('/api/auth/signup', async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const newUser = {
            Username,
            Passhash: sha256(Password),
            Affiliation: process.env.USER_AFF,
            OrgName: process.env.ORG_NAME,
            CA: `ca.${process.env.ORG_NAME}.healthchain.com`
        };

        // Create Wallet Identity for the Username
        const { exec, message } = await FabricAPI.Account.RegisterUser(newUser);

        // Add username & passhash to the MongoDB Auth Database
        User.create(newUser, (err) => {
            console.log(err);
            res.status(200).send({
                message: 'Sign Up Successful!'
            });
        });

        if (exec === true)
            res.status(200).send({
                message
            });
        else throw new Error(message);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Server Error! ${error.message}`
        });
    }
});

// Verify JWT Route
router.get('/api/auth/verify', (req, res) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(
            token,
            JWTConfig.secretKey,
            {
                algorithm: JWTConfig.algorithm
            },
            (err, decoded) => {
                if (err) {
                    res.status(401).send({
                        status: 0
                    });
                }
                res.status(200).send({
                    status: 1,
                    username: decoded.username,
                    organization: decoded.organization
                });
            }
        );
    } else {
        res.status(401).send({
            status: 0
        });
    }
});

module.exports = router;
