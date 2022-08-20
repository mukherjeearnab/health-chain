const axios = require('axios');

module.exports = async (username) => {
    try {
        const res = await axios.get(`http://${process.env.L1_API}/hie/get/${username}`);
        return res.data;
    } catch {
        return { message: '404 Not Found' };
    }
};
