const jwt = require('jsonwebtoken');
const config = require('./config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    // retrieve the token from the headers
    const token = req.headers['x-access-token'];

    // if a token is retrieved, verify it
    if (token) {
        jwt.verify(
            token,
            config.secretKey,
            {
                algorithm: config.algorithm
            },

            // eslint-disable-next-line consistent-return
            (err, decoded) => {
                // if an error is encountered, this means the token is invalid
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorised access!'
                    });
                }

                // else the token is valid, send the token and move to next to function
                req.user = decoded;
                next();
            }
        );
    } else {
        // if no token is retrieved, send 403 because token is required for authorization
        return res.status(403).send({
            message: 'Forbidden access!'
        });
    }
};
