const fetch = require("node-fetch");

modules.export = async (AadhaarID, Candidate) => {
    const res = await fetch(`http://${process.env.L1_API}/consent/revoke/${AadhaarID}`, {
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
