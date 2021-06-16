require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./app/router');

const expressSwagger = require('express-swagger-generator')(app);

const swaggerOptions = require('./app/swaggerDoc');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.text());

app.use('/api', router);

expressSwagger(swaggerOptions);

app.listen(PORT, () => {
    console.log('listening to port ' + PORT);
});