const axios = require('axios');

module.exports = async (URL, Headers) => {
    const config = {
        headers: Headers
    };

    const res = await axios.get(URL, config);

    return res;
};
