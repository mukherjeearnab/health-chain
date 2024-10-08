const mongoose = require('mongoose');

const connectionString = `mongodb://${process.env.MONGODB_URI}`;
console.log('Connecting MongoDB @', connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
