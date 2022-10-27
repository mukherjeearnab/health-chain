const HTTP = require('../../modules/http');

module.exports = async (LocalID) => {
    try {
        const res = await HTTP.Get(`http://${process.env.REGISTRY_API}/local/get/${LocalID}`);
        return { status: 200, data: res.data };
    } catch {
        return { status: 404, message: '404 Not Found' };
    }
};
