const { EMR } = require('../../../data');
const EventLogger = require('../../../data/traceability');

module.exports = async (AadhaarID, ReadBy) => {
    // check if the object exists (if not exits return with 404)
    const object = await EMR.Read(AadhaarID);
    if (object.length === 0) {
        return {
            status: 404,
            data: undefined,
            message: 'Object does not exist! Update Operation Aborted.'
        };
    }

    if (ReadBy !== AadhaarID) {
        console.log('Recording Event Log.');
        await EventLogger.AddEvent(AadhaarID, 'EMR-Read', ReadBy, 'n/a');
    }

    // return the payload
    return {
        status: 201,
        data: object
    };
};
