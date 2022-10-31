const axios = require('axios');

module.exports = async (URL, Body, Headers) => {
    const config = {
        headers: Headers
    };

    const res = await axios.post(URL, Body, config);

    return res;
};
