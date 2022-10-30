const express = require('express');

const FabricAPI = require('../../fabric/api');

const router = new express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    const { Username } = req.body;
    try {
        const newUser = {
            Username,
            Affiliation: process.env.USER_AFF,
            OrgName: process.env.ORG_NAME,
            CA: `ca.${process.env.ORG_NAME}.healthchain.com`
        };

        // Create Wallet Identity for the Username
        await FabricAPI.Account.RegisterUser(newUser);

        res.status(200).send({
            message: 'User registration Successful!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Server Error! User registration failed!'
        });
    }
});

module.exports = router;
