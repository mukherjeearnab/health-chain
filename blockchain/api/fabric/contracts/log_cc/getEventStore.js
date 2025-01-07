const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'log_cc',
        Channel: 'mainchannel',
        Function: 'getEventStore',
        Params: params
    };

    const reply = await FabricAPI.Contract.EvaluateTransaction(user, contract);

    return reply;
};
