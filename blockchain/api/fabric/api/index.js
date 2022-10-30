// Import Account Functions
const EnrollAdmin = require('./enroll-admin');
const RegisterUser = require('./register-user');

// Import Contract Functions
const EvaluateTransaction = require('./evaluate-transaction');
const SubmitTransaction = require('./submit-transaction');

module.exports = {
    Account: {
        EnrollAdmin,
        RegisterUser
    },
    Contract: {
        EvaluateTransaction,
        SubmitTransaction
    }
};
