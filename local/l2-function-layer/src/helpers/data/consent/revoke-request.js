const axios = require('axios');

module.exports = async (AadhaarID, RequesterIndex) => {
    const res = await axios.post(
        `http://${process.env.L1_API}/consent/revoke-request/${AadhaarID}`,
        { RequesterIndex }
    );

    return res.status;
};
