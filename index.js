// npm imports
require('dotenv').config();

const express = require('express');

// we initialize our server
const server = express();

const expressSwagger = require('express-swagger-generator')(server);

const swaggerOptions = require('./app/swaggerDoc');

const router = require('./app/router');


const PORT = process.env.PORT || 3000;

// We tell express we're expecting Json and text/plain from POST request
server.use(express.json());
server.use(express.text());

// We configure express to use our router on the path /api
server.use('/api', router);

// this will generate swagger doc for our API
expressSwagger(swaggerOptions);

// 
server.listen(PORT, () => {
    console.log('listening to port ' + PORT);
});