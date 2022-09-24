const HTTP = require('../../modules/http');

module.exports = async (username) => {
    try {
        const res = await HTTP.Post(`http://${process.env.L1_API}/hie/get/${username}`);
        return res.data;
    } catch {
        return { message: '404 Not Found' };
    }
};
