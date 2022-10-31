const HTTP = require('../modules/http');

module.exports = async (Type, ID, Hash) => {
    const res = await HTTP.Post(
        `http://api.blc.${process.env.NODE_PREFIX}.healthchain.com:3000/contract/asset/set`,
        {
            Type,
            ID,
            Hash
        },
        {
            'x-access-username': 'admin'
        }
    );

    console.log(`Integrity Setting Status ${res.status}.`);
};
