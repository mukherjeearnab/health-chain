const HTTP = require('../../modules/http');

module.exports = async (AadhaarID) => {
    try {
        const res = await HTTP.Get(`http://${process.env.L1_API}/emr/get/${AadhaarID}`);
        return res.data;
    } catch {
        return { message: '404 Not Found' };
    }
};
