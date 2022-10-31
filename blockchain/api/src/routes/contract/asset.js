const express = require('express');
const sha256 = require('sha256');

const AssetContract = require('../../../fabric/contracts/asset_cc');

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`asset_cc route`);
});

router.get('/get/:type/:id', async (req, res) => {
    try {
        const { exec, result } = await AssetContract.GetAsset(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.type, req.params.id]
        );

        if (exec === true) res.status(200).send(result);
        else res.status(404).send({ message: 'Asset NOT found!' });
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

router.post('/set', async (req, res) => {
    const { Type, ID, Hash } = req.body;

    try {
        const { exec, result } = await AssetContract.SetAsset(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [Type, ID, sha256(Hash)]
        );

        if (exec === true) res.status(200).send({ result, message: 'Asset successfully set.' });
        else throw new Error('Chaincode Error! Check API Server logs.');
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

router.get('/history/:type/:id', async (req, res) => {
    try {
        const { exec, result } = await AssetContract.GetAssetHistory(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.type, req.params.id]
        );

        if (exec === true) res.status(200).send(result);
        else res.status(404).send({ message: 'Asset NOT found!' });
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

module.exports = router;
