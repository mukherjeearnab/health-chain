// import packages and mongoose object
const mongoose = require('mongoose');
require('../db/mongoose');

// import JSON model schema
const model = require('./schema/ehr');

// create Mongoose schema using JSON model
const schema = new mongoose.Schema(model);

// create Mongoose model using the schema
const objectModel = mongoose.model('facilityRegistry', schema);

// export Mongoose model
module.exports = objectModel;
