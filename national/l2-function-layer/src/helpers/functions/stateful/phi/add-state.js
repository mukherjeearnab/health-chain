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

    // if state is already in the list, skip, and return
    const object = check;
    if (object.StateLocations.includes(StateID))
        return {
            status: 201,
            data: undefined,
            message: 'StateID already exist! Update Operation Successful.'
        };

    // add the new state to the object
    object.StateLocations.push(StateID);

    // create the object
    const reply = await PHI.Update(check._id, object);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
