const jwt = require('jsonwebtoken');

const JWTConfig = require('./config');
const DB = require('../../../data');

module.exports = async (username, passhash, group) => {
    // fetch user credentials record
    const document = await DB.HIE.GetAccount(username);

    console.log(document, username);

    // if document contains message, i.e. error, return error
    if (document.message || document.username !== username) return { status: 404, data: undefined };

    // if password hash supplied is correct, generate token and authenticate user
    if (document.passhash === passhash) {
        const userdata = {
            username,
            passhash,
            group
        };

        // sign and generate the token with the required user information
        const token = jwt.sign(userdata, JWTConfig.secretKey, {
            algorithm: JWTConfig.algorithm,
            expiresIn: '1d'
        });

        return { status: 200, data: token };
    }

    // if everything fails, return 401
    return { status: 401, data: undefined };
};
