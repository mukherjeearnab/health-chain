// import packages
const express = require('express');
// const cors = require("cors");

// initialize express app
const app = express();

// configure dotenv
require('dotenv').config();

// register node to the network registry
const Register = require('./init/register-node');

setTimeout(async () => {
    console.log('Registration Starting.');
    await Register();
    console.log('Registration End.');
});

// JSON Middleware
app.use(express.json());

// CORS Middleware
// app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

// Load API Routes
require('./routes')(app);

// Start Listening
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}.`));
