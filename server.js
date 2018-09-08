var express = require('express');
var dotenv = require('dotenv');

var app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('The API is online');
});

app.listen(process.env.NODE_PORT, () => {
    console.log(`API listening on port ${process.env.NODE_PORT}`);
});
