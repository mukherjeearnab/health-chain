const DB = require('../../../data');
const EventLogger = require('../../../data/traceability');

module.exports = async (Account, Candidate) => {
    // fetch consent record
    const document = await DB.Consent.Get(Account);

    // Check if revoking candidate is already present in the requests list
    for (let i = 0; i < document.ConsentRequests.length; i += 1) {
        // if the request is already present, revoke the request with the given index
        if (document.ConsentRequests[i].Requester === Candidate) {
            // eslint-disable-next-line no-await-in-loop, no-return-await
            return await DB.Consent.RevokeRequest(Account, i);
        }
    }

    // execute the revoke action for a new Candidate not in the Request List
    const res = await DB.Consent.Revoke(Account, Candidate);

    console.log('Recording Event Log.');
    await EventLogger.AddEvent(Account, 'Consent-Revoked', Account, Candidate);

    return res;
};
