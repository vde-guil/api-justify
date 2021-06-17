// npm imports
const jwt = require('jsonwebtoken');

/**
 * express middleware that protects the route it is applied to by checking the token validity, then stores the user info in res.locals
 * @param {object} req - request 
 * @param {object} res - response
 * @param {*} next 
 * 
*/
const verifyToken = async (req, res, next) => {

    // we get the authorization string from the request header where the token should be
    const authHeader = req.header('Authorization');

    // if the authorization string is missing, then the servers responds with a 401
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // we extract the token from the auth string. the format is "token xxxxxxx"
    const token = authHeader.split(' ')[1];

    try {

        // We try to validate the token
        const result = await jwt.verify(token, process.env.JWT_SECRET);

        //the token is legit, we store the information received to pass it to the next middlwares
        res.locals.user = result;
        next();

    } catch (error) { // if the token is not valid anymore, or has been tampered with => 401
        res.status(401).json({ message: error.message });
    }

}

module.exports = { verifyToken };