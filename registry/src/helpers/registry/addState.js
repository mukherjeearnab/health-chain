const DB = require('../db');

module.exports = async (state) => {
    // create Local object
    const stateObj = await DB.Create({ ID: state.ID }, state, 'state');

    // fetch national Object
    const natObj = (await DB.Read({ ID: stateObj.National }, 'national'))[0];

    // add new state entry
    // if state is already in the list, skip, and return
    if (natObj.States.includes(stateObj.ID))
        return {
            status: 201,
            data: undefined,
            message: 'StateID already exist! Update Operation Successful.'
        };

    // add the new state to the object
    natObj.States.push(stateObj.ID);

    // update national object
    const reply = await DB.Update(natObj._id, natObj, 'national');

    return reply;
};
