const DB = require('../db');

module.exports = async (local) => {
    // create Local object
    const localObj = await DB.Create({ ID: local.ID }, local, 'local');

    // fetch state Object
    const stateObj = (await DB.Read({ ID: localObj.State }, 'state'))[0];

    // add new local facility entry
    // if local is already in the list, skip, and return
    if (stateObj.LocalFacilities.includes(localObj.ID))
        return {
            status: 201,
            data: undefined,
            message: 'LocalID already exist! Update Operation Successful.'
        };

    // add the new local to the object
    stateObj.LocalFacilities.push(localObj.ID);

    // update state object
    const reply = await DB.Update(stateObj._id, stateObj, 'state');

    return reply;
};
