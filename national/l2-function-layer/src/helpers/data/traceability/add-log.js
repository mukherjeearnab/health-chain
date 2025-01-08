const HTTP = require('../../modules/http');

module.exports = async (HealthID, EventType, From, To) => {
    const res = await HTTP.Post(
        `http://api.blc.${process.env.NODE_PREFIX}.healthchain.com:3000/contract/log/add-log`,
        {
            HealthID,
            EventType,
            From,
            To
        },
        {
            'x-access-username': 'admin'
        }
    );

    console.log(`Logging Status of Event ${res.status}.`);
};
