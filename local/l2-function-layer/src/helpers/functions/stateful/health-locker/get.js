const DB = require('../../../data');

module.exports = async (Account) => {
    // fetch PHI for the account
    const phi = await DB.PHI.Get(Account);

    // fetch PHR for the account
    const phr = await DB.PHR.Get(Account);

    // assemble andd return the HealthLocker Object
    return {
        PatientInformation: phi,
        HealthRecordInformation: phr
    };
};
