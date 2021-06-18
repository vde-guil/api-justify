const sanitizer = require('sanitizer');


const sanitize = obj => {
    for (const prop in obj) {
        obj[prop] = sanitizer.escape(obj[prop]);
    }
}

/**
 * middleware that sanitize all the user entrie to protect agains xss attacks (it will escape dangerous characters)
 * @param {object} req - request 
 * @param {object} res -response 
 */
const bodySanitizer = (req, res, next) => {

    if (req.body) {
        sanitize(req.body);
    }
    next();
}

module.exports = bodySanitizer;