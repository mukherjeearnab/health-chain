const { PHI, EHR, EMR } = require('../../../data');

module.exports = async (AadhaarID) => {
    // check if the object exists (if not exits return with 404)
    const object = await PHI.Read(AadhaarID);
    if (object.length === 0) {
        return {
            status: 404,
            data: undefined,
            message: 'Object does not exist! Update Operation Aborted.'
        };
    }

    const assembly = {
        ...object,
        EMR: []
    };

    // get state locations
    const { StateLocations } = object;

    // for each state location
    for (let i = 0; i < StateLocations.length; i += 1) {
        const StateID = StateLocations[i];

        // get the local PHR/EMR locations
        // eslint-disable-next-line no-await-in-loop
        const { PHRLocations } = await EHR.Read(AadhaarID, StateID);

        // for each local EMR location
        for (let j = 0; j < PHRLocations.length; j += 1) {
            const LocalID = PHRLocations[j];

            // fetch all medical records of that location
            // eslint-disable-next-line no-await-in-loop
            const { MedicalRecords } = await EMR.Read(AadhaarID, LocalID);

            console.log('GOT EMR', MedicalRecords);

            // add the records to the assembly object
            for (let k = 0; k < MedicalRecords.length; k += 1) assembly.EMR.push(MedicalRecords[k]);
        }
    }

    // return the payload
    return {
        status: 201,
        data: assembly
    };
};
