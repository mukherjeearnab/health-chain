const fetch = require("node-fetch");

module.exports = async (AadhaarID, Candidate) => {
    const res = await fetch(`http://${process.env.L1_API}/consent/allow/${AadhaarID}`, {
        method: "POST",
        body: JSON.stringify({
            Candidate,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
};
