const HTTP = require('../../modules/http');
const Registry = require('../registry');

module.exports = async (AadhaarID, LocalID) => {
    const {
        data: { ConnectionPrefix }
    } = await Registry.GetState(process.env.NODE_STATE_ID);

    console.log('GOT STATE', ConnectionPrefix);

    const res = await HTTP.Post(
        `http://api.l2.${ConnectionPrefix}:3000/ehr/add-local/${AadhaarID}`,
        {
            LocalID
        }
    );

    return res.data;
};
