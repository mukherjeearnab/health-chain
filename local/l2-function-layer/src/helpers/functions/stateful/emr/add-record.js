const { EMR, EHR } = require('../../../data');

module.exports = async (AadhaarID, Record) => {
    // check if the object exists (if not exits create record)
    const check = await EMR.Read(AadhaarID);
    if (check.length === 0) {
        // create the object record
        await EMR.Create({
            AadhaarID
        });
    }

    // read the created object
    const object = await EMR.Read(AadhaarID);

    console.log('EMR OBJECT', object);

    // add the new state to the object
    object.MedicalRecords.push(Record);

    // create the object
    const reply = await EMR.Update(object._id, object);

    // if all goes well, send this LocalID to State Node
    const ehr = await EHR.AddLocal(AadhaarID, process.env.NODE_ID);
    console.log('ADD LOCAL STATUS', ehr);

    // return the payload
    return {
        status: 201,
        data: reply
    };
};
