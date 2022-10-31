const ObjectIntegrity = require('../integrity');

module.exports = async (_id, object, schemaName) => {
    try {
        // Load the schema
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Schema = require(`../../models/${schemaName}`);

        // Check if Object already exists or not
        const check = await Schema.find({ _id });
        if (check.length === 0) throw new Error('Entry does NOT exists! Update action aborted.');

        // Update the object with the given object '_id'
        const doc = await Schema.updateOne({ _id }, object);

        const integrity = await Schema.find({ _id });
        console.log('Recording Object Integriy.');
        await ObjectIntegrity.Set(schemaName, _id, JSON.stringify(integrity));

        console.log(`Updating document ${doc} with _id ${_id} in schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error('Error updating document!', err);
        return undefined;
    }
};
