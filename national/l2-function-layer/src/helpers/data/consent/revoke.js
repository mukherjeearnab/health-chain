const HTTP = require('../../modules/http');

module.exports = async (AadhaarID, Candidate) => {
    const res = await HTTP.Post(`http://${process.env.L1_API}/consent/revoke/${AadhaarID}`, {
        Candidate
    });

    return res.status;
};
