const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'asset_cc',
        Channel: 'mainchannel',
        Function: 'setAsset',
        Params: params
    };

    const reply = await FabricAPI.Contract.SubmitTransaction(user, contract);

    return reply;
};
