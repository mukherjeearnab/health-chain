const HTTP = require('../helpers/modules/http');

module.exports = async () => {
    const node = {
        ID: process.env.NODE_ID,
        ConnectionPrefix: process.env.NODE_PREFIX,
        Name: process.env.NODE_NAME,
        State: process.env.NODE_STATE_ID
    };

    const res = await HTTP.Post(`http://${process.env.REGISTRY_API}/local/create`, node);

    console.log('Node Registration Status', res.status);

    return res;
};
