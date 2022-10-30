const express = require('express');

const router = new express.Router();

// root
router.get('/', async (req, res) => {
    res.status(200).send(`DUMMY_CC route`);
});

module.exports = router;
