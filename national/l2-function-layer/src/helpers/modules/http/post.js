const axios = require('axios');

module.exports = async (URL, Body) => {
    const res = await axios.post(URL, Body);

    return res;
};
