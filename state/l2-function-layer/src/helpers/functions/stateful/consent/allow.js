const DB = require('../../../data');

module.exports = async (Account, Candidate) => {
    // fetch consent record
    const document = await DB.Consent.Get(Account);

    // Check if requesting candidate is already present in the requests list
    for (let i = 0; i < document.ConsentRequests.length; i += 1) {
        // if the request is already present, allow the request with the given index
        if (document.ConsentRequests[i].Requester === Candidate) {
            // eslint-disable-next-line no-await-in-loop, no-return-await
            return await DB.Consent.AllowRequest(Account, i);
        }
    }

    // execute the allow action for a new Candidate not in the Request List
    return DB.Consent.Allow(Account, Candidate);
};
