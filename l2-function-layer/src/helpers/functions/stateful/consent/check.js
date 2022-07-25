const DB = require("../../../data");

module.exports = async (Account, Candidate) => {
    // fetch consent record
    const document = await DB.Consent.Get(Account);

    // based on whether the consent is provide or not return appropriate boolean result
    if (document.Consent[`${Candidate}`] === true) return true;
    else return false;
};
