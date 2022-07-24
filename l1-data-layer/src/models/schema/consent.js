module.exports = {
    AadhaarID: String,
    Consent: {
        type: Map,
        of: String,
        default: {},
    },
    ConsentRequests: [
        {
            timestamp: Number,
            Requester: String,
            message: String,
            status: {
                allowed: Boolean,
                timestamp: Number,
            },
        },
    ],
};
