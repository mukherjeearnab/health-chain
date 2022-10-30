const fs = require('fs');
const path = require('path');
const express = require('express');

const router = new express.Router();

const addRoutes = (Router) => {
    /**
     * @summary Read all files from the current directory and use then as routes.
     */
    fs.readdirSync(`${path.resolve()}/src/routes/contract`).forEach((file) => {
        console.log(file);
        if (file.match(/\.js$/) !== null && file !== 'index.js')
            // eslint-disable-next-line import/no-dynamic-require, global-require
            Router.use(`/${file.replace('.js', '')}`, require(`./${file.replace('.js', '')}`));
    });
};

addRoutes(router);

module.exports = router;
