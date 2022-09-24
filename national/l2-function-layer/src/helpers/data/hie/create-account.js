const HTTP = require('../../modules/http');

module.exports = async (username, passhash, group) => {
    const res = await HTTP.Post(`http://${process.env.L1_API}/hie/create/`, {
        username,
        passhash,
        group
    });

    return res.status;
};
