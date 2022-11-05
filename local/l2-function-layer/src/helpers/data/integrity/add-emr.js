const HTTP = require('../../modules/http');

module.exports = async (HealthID, LocalID, EMR) => {
    const res = await HTTP.Post(
        `http://api.blc.${process.env.NODE_PREFIX}.healthchain.com:3000/contract/emr/add-emr`,
        {
            HealthID,
            LocalID,
            EMR
        },
        {
            'x-access-username': 'admin'
        }
    );

    console.log(`Integrity Setting Status of EMR ${res.status}.`);
};
