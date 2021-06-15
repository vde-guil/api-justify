const Joi = require('joi');

module.exports = {

    registerSchema: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(8).max(30).required(),
        email: Joi.string().email().required(),
    }),
    
    loginSchema: Joi.object({
        password: Joi.string().min(8).max(30).required(),
        email: Joi.string().email().required(),
    }),
};
    