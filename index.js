require('dotenv').config();
const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3000;

app.use(express.text());
app.use('/api', router);

app.listen(PORT, () => {
    console.log('listening to port ' + PORT);
});