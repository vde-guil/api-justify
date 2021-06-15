// npm imports
const { Router } = require('express');
const router = new Router();

// other imports
const justifyController = require('./controllers/justifyController');
const userController = require('./controllers/userController');
const { registerSchema, loginSchema } = require('./schema/user');
const { validateBody } = require('./services/validator');
const { verifyToken } = require('./services/jwtVerify');
const { cleanTextToJustify } = require('./services/cleanBodyText');
const {limitRate} = require('./services/limitRate');

router.post('/register', validateBody(registerSchema), userController.register);
router.post('/login', validateBody(loginSchema), userController.login);



router.post('/justify', verifyToken, cleanTextToJustify, limitRate, justifyController.handleJustify);

module.exports = router;