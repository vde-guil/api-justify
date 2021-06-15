const { response } = require("express");

module.exports = {
    validateBody: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            res.status(400).json({message: error.message});
        } else {
            next();
        }
    }
}