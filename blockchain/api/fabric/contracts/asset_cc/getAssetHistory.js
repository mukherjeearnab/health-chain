const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'asset_cc',
        Channel: 'mainchannel',
        Function: 'getAssetHistory',
        Params: params
    };

    try {
        const reply = await FabricAPI.Contract.EvaluateTransaction(user, contract);

        return reply;
    } catch (error) {
        console.error(
            `Failed to execute ${contract.Function} in ${contract.Name} in ${contract.Channel}.`,
            error.message
        );
    }

    // if all fails, return null
    return null;
};
