const { Router } = require('express');
const router = new Router();

const justifyController = require('./controllers/justifyController');


router.post('/justify', justifyController.handleJustify);

module.exports = router;