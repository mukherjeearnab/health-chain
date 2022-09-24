const fs = require('fs');
const path = require('path');

const routes = (app) => {
    /**
     * @summary Read all files from the current directory and use then as routes.
     */
    fs.readdirSync(`${path.resolve()}/src/routes/`).forEach((file) => {
        console.log(file);
        if (file.match(/\.js$/) !== null && file !== 'index.js')
            // eslint-disable-next-line import/no-dynamic-require, global-require
            app.use(`/${file.replace('.js', '')}`, require(`./${file.replace('.js', '')}`));

        // check if file is folder, i.e. no '.' in name
        if (!file.includes('.'))
            // eslint-disable-next-line import/no-dynamic-require, global-require
            app.use(`/${file}`, require(`./${file}`));
    });
};

module.exports = routes;
