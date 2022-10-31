const ObjectIntegrity = require('../integrity');

module.exports = async (id, object, schemaName) => {
    try {
        // Load the schema
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Schema = require(`../../models/${schemaName}`);

        // Check if Object already exists or not
        const check = await Schema.find(id);
        if (check.length > 0) throw new Error('Entry already exists! Create action aborted.');

        // Create the schema object into the database
        const doc = await Schema.create(object);

        const integrity = await Schema.find({ _id: doc._id });
        console.log('Recording Object Integriy.');
        await ObjectIntegrity.Set(schemaName, doc._id, JSON.stringify(integrity));

        console.log(`Created document ${doc} with schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error('Error creating document!', err);
        return undefined;
    }
};
