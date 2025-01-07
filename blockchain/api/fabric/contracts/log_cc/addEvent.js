const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'log_cc',
        Channel: 'mainchannel',
        Function: 'addEvent',
        Params: params
    };

    const reply = await FabricAPI.Contract.SubmitTransaction(user, contract);

    return reply;
};
