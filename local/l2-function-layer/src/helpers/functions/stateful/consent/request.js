const DB = require('../../../data');

module.exports = async (Account, Candidate, Message) => {
    // fetch consent record
    const document = await DB.Consent.NewRequest(Account, Candidate, Message);

    return document;
};
