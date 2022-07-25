const fetch = require("node-fetch");

modules.export = async (AadhaarID, RequesterIndex) => {
    const res = await fetch(`http://${process.env.L1_API}/consent/revoke-request/${AadhaarID}`, {
        method: "POST",
        body: JSON.stringify({
            RequesterIndex,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
};
