const HTTP = require('../../modules/http');

module.exports = async (AadhaarID, RequesterIndex) => {
    const res = await HTTP.Post(
        `http://${process.env.L1_API}/consent/revoke-request/${AadhaarID}`,
        { RequesterIndex }
    );

    return res.status;
};
