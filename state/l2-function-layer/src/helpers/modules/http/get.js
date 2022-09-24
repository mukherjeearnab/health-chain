const axios = require('axios');

module.exports = async (URL) => {
    const res = await axios.get(URL);

    return res;
};
