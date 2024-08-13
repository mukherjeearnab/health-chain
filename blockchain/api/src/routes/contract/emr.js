const express = require('express');
const sha256 = require('sha256');

const JWTmiddleware = require('../../helpers/jwtVerifyMiddleware');

const EMRStoreContract = require('../../../fabric/contracts/emr_cc');

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`asset_cc route`);
});

router.get('/get/:HealthID/:LocalID', JWTmiddleware, async (req, res) => {
    try {
        const { exec, result } = await EMRStoreContract.GetEMRStore(
            {
                Username: req.user.Username,
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.HealthID, req.params.LocalID]
        );

        if (exec === true) res.status(200).send(result);
        else res.status(404).send({ message: 'EMRStore NOT found!' });
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

router.post('/add-emr', JWTmiddleware, async (req, res) => {
    const { HealthID, LocalID, EMR } = req.body;

    try {
        const { exec, result } = await EMRStoreContract.AddEMR(
            {
                Username: req.user.Username,
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [HealthID, LocalID, sha256(EMR)]
        );

        if (exec === true) res.status(200).send({ result, message: 'EMRStore successfully set.' });
        else throw new Error('Chaincode Error! Check API Server logs.');
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

router.get('/history/:HealthID/:LocalID', JWTmiddleware, async (req, res) => {
    try {
        const { exec, result } = await EMRStoreContract.GetEMRStoreHistory(
            {
                Username: req.user.Username,
                Affiliation: process.env.USER_AFF,
                OrgName: process.env.ORG_NAME,
                CA: `ca.${process.env.ORG_NAME}.healthchain.com`
            },
            [req.params.HealthID, req.params.LocalID]
        );

        if (exec === true) res.status(200).send(result);
        else res.status(404).send({ message: 'EMRStore NOT found!' });
    } catch (error) {
        res.status(500).send({ message: `SERVER ERROR! ${error.message}` });
    }
});

module.exports = router;
