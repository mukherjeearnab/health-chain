const { PHI } = require('../../../data');

module.exports = async (AadhaarID, StateID) => {
    // check if the object exists (if not exits return with 403)
    const check = await PHI.Read(AadhaarID);
    if (check.length === 0) {
        return {
            status: 404,
            data: undefined,
            message: 'Object does not exist! Update Operation Aborted.'
        };
    }

    // add the new state to the object
    const object = check;
    object.StateLocations.push(StateID);

    // create the object
    const reply = await PHI.Update(check._id, object);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
