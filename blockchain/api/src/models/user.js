const mongoose = require('mongoose');
require('../db/mongoose');

const userInfo = new mongoose.Schema({
    Username: {
        type: 'String'
    },
    Passhash: {
        type: 'String'
    },
    Affiliation: {
        type: 'String'
    },
    OrgName: {
        type: 'String'
    },
    CA: {
        type: 'String'
    }
});

const user = mongoose.model('userInfo', userInfo, 'userinfo');

module.exports = user;
