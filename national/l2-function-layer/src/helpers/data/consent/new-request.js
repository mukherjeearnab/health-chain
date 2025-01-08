const HTTP = require('../../modules/http');

module.exports = async (AadhaarID, Candidate, Message) => {
    const res = await HTTP.Post(`http://${process.env.L1_API}/consent/new-request/${AadhaarID}`, {
        Candidate,
        Message
    });

    return res.status;
};
