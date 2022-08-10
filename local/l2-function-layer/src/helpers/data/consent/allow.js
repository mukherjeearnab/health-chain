const axios = require('axios');

module.exports = async (AadhaarID, Candidate) => {
    const res = await axios.post(`http://${process.env.L1_API}/consent/allow/${AadhaarID}`, {
        Candidate
    });

    return res.status;
};
