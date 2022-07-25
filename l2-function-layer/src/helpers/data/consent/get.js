const fetch = require("node-fetch");

modules.export = async (AadhaarID) => {
    const res = await fetch(`http://${process.env.L1_API}/consent/get/${AadhaarID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
};
