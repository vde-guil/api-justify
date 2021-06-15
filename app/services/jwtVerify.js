const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return ;
    }
    const token = authHeader.split(' ')[1];
    try {

        // We try to validate the token
        const result = await jwt.verify(token, process.env.JWT_SECRET);

        //the token is legit, we store the information received to pass it to the next middlwares
        res.locals.user = result;
        next();

    } catch (error) {
        res.status(401).json({message: error.message});
    }

}

module.exports = { verifyToken };