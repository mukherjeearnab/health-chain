const HTTP = require('../../modules/http');

module.exports = async (AadhaarID) => {
    const res = await HTTP.Get(`http://${process.env.L1_API}/phi/get/${AadhaarID}`);

    return res.data;
};
