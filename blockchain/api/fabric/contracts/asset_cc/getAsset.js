const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'asset_cc',
        Channel: 'mainchannel',
        Function: 'getAsset',
        Params: params
    };

    const reply = await FabricAPI.Contract.EvaluateTransaction(user, contract);

    return reply;
};
