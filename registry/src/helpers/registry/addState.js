const DB = require('../db');

const SchemaName = 'national';

module.exports = async (NationalID, StateID) => {
    // fetch national Object
    const natObj = await DB.Read({ ID: NationalID }, SchemaName);

    // add new state entry
    natObj.States.push(StateID);

    // update national object
    const reply = await DB.Update(natObj._id, natObj, SchemaName);

    return reply;
};
