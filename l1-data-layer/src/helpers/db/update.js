module.exports = async (_id, object, schemaName) => {
    try {
        // Load the schema
        const Schema = require(`../../models/${schemaName}`);

        // Update the object with the given object '_id'
        const doc = await Schema.updateOne({ _id }, object);

        console.log(`Updating document ${doc} with _id ${_id} in schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error("Error updating document!", err);
        return undefined;
    }
};
