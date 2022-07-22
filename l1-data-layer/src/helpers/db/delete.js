module.exports = async (_id, schemaName) => {
    try {
        // Load the schema
        const Schema = require(`../../models/${schemaName}`);

        // Update the object with the given object '_id'
        await Schema.deleteOne({ _id });

        console.log(`Deleting document with _id ${_id} from ${schemaName}.`);

        return true;
    } catch (err) {
        console.error("Error deleting document!", err);
        return undefined;
    }
};
