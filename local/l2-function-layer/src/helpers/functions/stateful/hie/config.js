// export the jwt secret key and encryption algorithm
module.exports = {
    secretKey: process.env.HIE_SECRET,
    algorithm: 'HS256'
};
