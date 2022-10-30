const express = require('express');

const AssetContract = require('../../../fabric/contracts/asset_cc');

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`asset_cc route`);
});

router.get('/get/:type/:id', async (req, res) => {
    try {
        const reply = await AssetContract.GetAsset(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.type, req.params.id]
        );

        res.status(200).send(reply);
    } catch (error) {
        res.status(404).send({ message: 'Asset NOT found!' });
    }
});

router.post('/set', async (req, res) => {
    const { Type, ID, Hash } = req.body;

    try {
        const reply = await AssetContract.SetAsset(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [Type, ID, Hash]
        );

        res.status(200).send({ reply, message: 'Asset successfully set.' });
    } catch (error) {
        res.status(500).send({ message: 'Asset NOT Set!' });
    }
});

router.get('/history/:type/:id', async (req, res) => {
    try {
        const reply = await AssetContract.GetAssetHistory(
            {
                Username: req.headers['x-access-username'],
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.type, req.params.id]
        );

        res.status(200).send(reply);
    } catch (error) {
        res.status(404).send({ message: 'Asset NOT found!' });
    }
});

module.exports = router;
