const { EHR, PHI } = require('../../../data');

module.exports = async (AadhaarID, LocalID) => {
    // check if the object exists (if not exits create record)
    const check = await EHR.Read(AadhaarID);
    if (check.length === 0) {
        // create the object record
        await EHR.Create({
            AadhaarID
        });
    }

    // read the created object
    const object = await EHR.Read(AadhaarID);

    console.log('EHR OBJECT', object);

    // if local is already in the list, skip, and return
    if (object.PHRLocations.includes(LocalID))
        return {
            status: 201,
            data: undefined,
            message: 'LocalID already exist! Update Operation Successful.'
        };

    // add the new state to the object
    object.PHRLocations.push(LocalID);

    // create the object
    const reply = await EHR.Update(object._id, object);

    // if all goes well, send this StateID to National Node
    const phi = await PHI.AddState(AadhaarID, process.env.NODE_ID);
    console.log('ADD STATE STATUS', phi);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
