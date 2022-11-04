const FabricAPI = require('../../api');

module.exports = async (user, params) => {
    const contract = {
        Name: 'emr_cc',
        Channel: 'mainchannel',
        Function: 'addEMR',
        Params: params
    };

    const reply = await FabricAPI.Contract.SubmitTransaction(user, contract);

    return reply;
};
