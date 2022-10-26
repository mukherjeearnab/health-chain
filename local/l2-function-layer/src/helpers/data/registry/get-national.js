const HTTP = require('../../modules/http');

module.exports = async () => {
    try {
        const res = await HTTP.Get(
            `http://${process.env.REGISTRY_API}/national/get/${process.env.NODE_NATIONAL_ID}`
        );
        return { status: 200, data: res.data };
    } catch {
        return { status: 404, message: '404 Not Found' };
    }
};
