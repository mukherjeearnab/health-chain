const HTTP = require('../../modules/http');

module.exports = async (object) => {
    const res = await HTTP.Post(`http://${process.env.L1_API}/ehr/create/`, object);

    return res.data;
};