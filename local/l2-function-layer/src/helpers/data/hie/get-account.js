const axios = require('axios');

module.exports = async (username) => {
    const res = await axios.get(`http://${process.env.L1_API}/hie/get/${username}`);

    return res.data;
};
