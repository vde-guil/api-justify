// npm imports
const { Router } = require('express');
const router = new Router();

// other imports
const justifyController = require('./controllers/justifyController');
const userController = require('./controllers/userController');

router.post('/register', userController.register);

router.post('/justify', justifyController.handleJustify);

module.exports = router;