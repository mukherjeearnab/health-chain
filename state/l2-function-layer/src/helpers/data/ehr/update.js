const HTTP = require('../../modules/http');

module.exports = async (_id, object) => {
    const res = await HTTP.Post(`http://${process.env.L1_API}/ehr/update/${_id}`, object);

    return res.data;
};
