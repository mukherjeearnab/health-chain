const { PHI } = require('../../../data');

module.exports = async (object) => {
    // check if the object exists (if exits return with 403)
    const check = await PHI.Read(object.AadhaarID);
    if (check.length !== 0) {
        return {
            status: 403,
            data: undefined,
            message: 'Object already exists! Create Operation Aborted.'
        };
    }

    // create the object
    const reply = await PHI.Create(object);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
