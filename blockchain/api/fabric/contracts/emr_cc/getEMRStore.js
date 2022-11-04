const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'emr_cc',
        Channel: 'mainchannel',
        Function: 'getEMRStore',
        Params: params
    };

    const reply = await FabricAPI.Contract.EvaluateTransaction(user, contract);

    return reply;
};