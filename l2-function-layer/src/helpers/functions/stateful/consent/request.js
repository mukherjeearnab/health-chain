const DB = require("../../data");

modules.export = async (Account, Candidate, Message) => {
    // fetch consent record
    const document = await DB.Consent.NewRequest(Account, Candidate, Message);

    return document;
};
