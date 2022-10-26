const HTTP = require('../../modules/http');
const Registry = require('../registry');

module.exports = async (AadhaarID, StateID) => {
    const {
        data: { ConnectionPrefix }
    } = await Registry.GetNational();

    console.log('GOT NATIONAL', ConnectionPrefix);

    const res = await HTTP.Post(
        `http://api.l2.${ConnectionPrefix}:3000/phi/add-state/${AadhaarID}`,
        {
            StateID
        }
    );

    return res.data;
};
