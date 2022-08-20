const axios = require('axios');

module.exports = async (username, passhash, group) => {
    const res = await axios.post(`http://${process.env.L1_API}/hie/create/`, {
        username,
        passhash,
        group
    });

    return res.status;
};
