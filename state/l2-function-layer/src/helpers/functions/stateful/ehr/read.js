const { EHR } = require('../../../data');

module.exports = async (AadhaarID) => {
    // check if the object exists (if not exits return with 404)
    const object = await EHR.Read(AadhaarID);
    if (object.length === 0) {
        return {
            status: 404,
            data: undefined,
            message: 'Object does not exist! Update Operation Aborted.'
        };
    }

    // return the payload
    return {
        status: 201,
        data: object
    };
};
