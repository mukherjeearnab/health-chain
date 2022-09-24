module.exports = async (object, schemaName) => {
    try {
        // Load the schema
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Schema = require(`../../models/${schemaName}`);

        // Create the schema object into the database
        const doc = await Schema.create(object);

        console.log(`Created document ${doc} with schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error('Error creating document!', err);
        return undefined;
    }
};
