const DB = require('../db');

const SchemaName = 'state';

module.exports = async (StateID, LocalID) => {
    // fetch state Object
    const stateObj = await DB.Read({ ID: StateID }, SchemaName);

    // add new local facility entry
    stateObj.LocalFacilities.push(LocalID);

    // update state object
    const reply = await DB.Update(stateObj._id, stateObj, SchemaName);

    return reply;
};
