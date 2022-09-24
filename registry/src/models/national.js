// import packages and mongoose object
const mongoose = require('mongoose');
require('../db/mongoose');

// import JSON game model schema
const model = require('./schema/national');

// create Mongoose schema using JSON game model
const schema = new mongoose.Schema(model);

// create Mongoose model using the schema
const objectModel = mongoose.model('PHIConsent', schema);

// export Mongoose model
module.exports = objectModel;
