const HTTP = require('../../modules/http');
const Registry = require('../registry');

module.exports = async (AadhaarID, LocalID) => {
    const {
        data: { ConnectionPrefix }
    } = await Registry.GetLocal(LocalID);

    console.log('GOT LOCAL', ConnectionPrefix);

    const res = await HTTP.Get(`http://api.l2.${ConnectionPrefix}:3000/emr/get/${AadhaarID}`);

    return res.data;
};
