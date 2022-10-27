const HTTP = require('../../modules/http');
const Registry = require('../registry');

module.exports = async (AadhaarID, StateID) => {
    const {
        data: { ConnectionPrefix }
    } = await Registry.GetState(StateID);

    console.log('GOT STATE', ConnectionPrefix);

    const res = await HTTP.Get(`http://api.l2.${ConnectionPrefix}:3000/ehr/get/${AadhaarID}`);

    return res.data;
};
