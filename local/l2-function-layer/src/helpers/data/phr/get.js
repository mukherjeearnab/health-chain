const axios = require('axios');

module.exports = async (AadhaarID) => {
    const res = await axios.get(`http://${process.env.L1_API}/phr/get/${AadhaarID}`);

    return res.data;
};
