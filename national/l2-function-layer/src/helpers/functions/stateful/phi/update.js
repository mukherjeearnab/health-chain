const { PHI } = require('../../../data');

module.exports = async (object) => {
    // check if the object exists (if not exits return with 403)
    const check = await PHI.Read(object.AadhaarID);
    if (check.length === 0) {
        return {
            status: 404,
            data: undefined,
            message: 'Object does not exist! Update Operation Aborted.'
        };
    }

    // create the object
    const reply = await PHI.Update(check._id, object);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
