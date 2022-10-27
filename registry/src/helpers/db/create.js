module.exports = async (id, object, schemaName) => {
    try {
        // Load the schema
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Schema = require(`../../models/${schemaName}`);

        // Check if Object already exists or not
        const check = await Schema.find(id);
        if (check.length > 0) {
            console.log('Entry already exists! Create action aborted.');
            return 200;
        }

        // Create the schema object into the database
        const doc = await Schema.create(object);

        console.log(`Created document ${doc} with schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error('Error creating document!', err);
        return undefined;
    }
};
