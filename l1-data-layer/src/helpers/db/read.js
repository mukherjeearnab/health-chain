module.exports = async (query, schemaName) => {
    try {
        // Load the schema
        const Schema = require(`../../models/${schemaName}`);

        // Query the database to find objects with the given query
        const doc = await Schema.find(query);

        console.log(`Found ${doc.length} documents with query ${query} in schema: ${schemaName}.`);

        return doc;
    } catch (err) {
        console.error("Error querying the database!", err);
        return undefined;
    }
};
