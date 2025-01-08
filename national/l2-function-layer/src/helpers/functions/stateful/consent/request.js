const DB = require('../../../data');
const EventLogger = require('../../../data/traceability');

module.exports = async (Account, Candidate, Message) => {
    // fetch consent record
    const document = await DB.Consent.NewRequest(Account, Candidate, Message);

    console.log('Recording Event Log.');
    await EventLogger.AddEvent(Account, 'Consent-Requested', Candidate, Account);

    return document;
};
