const jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(
            token,
            config.secretKey,
            {
                algorithm: config.algorithm
            },
            (err, decoded) => {
                if (err) {
                    res.status(401).send({
                        message: 'Unauthorised access!'
                    });
                }
                req.user = decoded;
                next();
            }
        );
    } else {
        res.status(403).send({
            message: 'Forbidden access!'
        });
    }
};
