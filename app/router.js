// npm imports
const { Router } = require('express');
const router = new Router();

// other imports
//  controllers
const justifyController = require('./controllers/justifyController');
const userController = require('./controllers/userController');

// Joi schemas and validator
const { registerSchema, loginSchema } = require('./schema/user');
const { validateBody } = require('./services/validator');

// token validator
const { verifyToken } = require('./services/jwtVerify');

// pre parsing of the text to justify
const { cleanTextToJustify } = require('./services/cleanBodyText');

//limit rate validator
const { limitRate } = require('./services/limitRate');

// body sanitizer to protect agains xss attacks

const bodySanitizer = require('./services/bodySanitizer');

/**
 * Route to register a new user
 * @route POST /register
 * @param {object} req.body - example: { "email": "", "password": "", "username": "" }
 * @produces application/json
 * @consumes application/json
 * @returns {object} 201 - object.message: user Successfuly created
 * @returns {object} 500 - object.message: server error
 */
router.post('/register', bodySanitizer, validateBody(registerSchema), userController.register);

/**
 * Route to authenticate a user
 * @route POST /login
 * @param {object} req.body - example: { "email": "valentin@gmail.com", "password": "qwerty123" }
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - Object.token : the jwt token
 * @returns {object} 401 - Object.message: Auth failed
 * @returns {object} 500 - object.message: server error
 * 
 */
router.post('/login', bodySanitizer, validateBody(loginSchema), userController.login);

/**
 * Route to authenticate a user
 * @route POST /justify
 * @param {string} req.body - the text to justify
 * @produces text/plain
 * @consumes text/plain
 * @returns {text/plain} 200 - the justified text
 * @returns {object} 401 - Object.message: Unauthorized
 * @return {object}  402 - when the limit rate has been reach
 * @returns {object} 500 - object.message: server error
 * @headers {string} Authorization 
 * @security JWT
 * 
 */
router.post('/justify', verifyToken, bodySanitizer, cleanTextToJustify, limitRate, justifyController.handleJustify);

module.exports = router;