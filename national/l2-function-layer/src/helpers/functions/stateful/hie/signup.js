const DB = require('../../../data');

module.exports = async (username, passhash, group) => {
    // fetch user credentials record
    const status = await DB.HIE.CreateAccount(username, passhash, group);

    // if everything is okay, return 200
    if (status === 201) return { status: 200, data: 'Sign Up Successful.' };

    // is status is not 201, return error
    return { status: 500, data: undefined };
};
