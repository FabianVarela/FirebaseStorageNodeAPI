var dotenv = require('dotenv');
var express = require('express');
var cors = require('cors');
var multer = require('multer');
var Storage = require('@google-cloud/storage');
var FileRoute = require('./src/route/file.route');

dotenv.config();

var app = express();
var upload  = multer({ storage: multer.memoryStorage() });

var dependencies = {
    storage: Storage,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    serviceAccountFile: process.env.SERVICE_ACCOUNT_FILE
};

FileRoute.init(dependencies);

app.get('/', (req, res) => {
    res.send('The API is online');
});

app.post('/fileUpload/', upload.array('file'), FileRoute.upload);

app.use(cors());

let port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
