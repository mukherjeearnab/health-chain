const fetch = require('node-fetch');

module.exports = async (AadhaarID, Candidate, Message) => {
    const res = await fetch(`http://${process.env.L1_API}/consent/new-request/${AadhaarID}`, {
        method: 'POST',
        body: JSON.stringify({
            Candidate,
            Message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.status;
};
