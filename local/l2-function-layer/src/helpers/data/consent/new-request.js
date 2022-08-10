const axios = require('axios');

module.exports = async (AadhaarID, Candidate, Message) => {
    const res = await axios.post(`http://${process.env.L1_API}/consent/new-request/${AadhaarID}`, {
        Candidate,
        Message
    });

    return res.status;
};
