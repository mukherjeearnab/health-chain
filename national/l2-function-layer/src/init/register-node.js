const HTTP = require('../helpers/modules/http');

module.exports = async () => {
    const node = {
        ID: process.env.NODE_ID,
        ConnectionPrefix: `${process.env.NODE_PREFIX}.healthchain.com`,
        Name: process.env.NODE_NAME
    };

    console.log('Registering Node', node);

    let res = 0;
    do {
        try {
            // eslint-disable-next-line no-await-in-loop
            res = await HTTP.Post(`http://${process.env.REGISTRY_API}/national/create`, node);
        } catch (ex) {
            console.log('Retrying.', res.status);
        }
    } while (res.status !== 201);

    console.log('Registration Successful', res.status);
};
