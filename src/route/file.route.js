var FileController = require('../controller/file.controller');

exports.init = (dependencies) => {
    FileController.init(dependencies);
}

exports.upload = (req, res) => {
    FileController.upload(req).then((data) => {
        res.status(200);
        res.send(data);
    }).catch((error) => {
        res.status(500);
        res.send(error);
    });
};
