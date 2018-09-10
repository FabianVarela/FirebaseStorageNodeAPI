var fileSystem = require('fs');

let bucket = null;

exports.init = (dependencies) => {
    let storage = dependencies.storage({
        projectId: `${dependencies.projectId}`,
        keyFilename: `${dependencies.serviceAccountFile}`
    });

    bucket = storage.bucket(`gs://${dependencies.storageBucket}`);
}

exports.saveFile = (folder, files) => {
    let folderPath = `${__dirname}/${folder}`;
    let savedFiles = [];

    if (!fileSystem.existsSync(folderPath)) {
        fileSystem.mkdirSync(folderPath);
        console.log(`folder ${folderPath} created`);
    }

    if (files.length) {
        for (var i = 0; i < files.length; i++) {
            let file = saveFile(folderPath, files[i]);
            savedFiles.push(file);
        }
    } else {
        let file = saveFile(folderPath, files);
        savedFiles.push(file);
    }

    return savedFiles;
};

exports.upload = (folder, fileUpload) => {
    bucket.upload(`${__dirname}/${folder}/${fileUpload}`, {
        destination: `${folder}/${fileUpload}`
    }, (error, file) => {
        if (!error) {
            console.log(`file ${file.name} uploaded!!!`);
        }
    });
};

exports.deleteFolder = (folder) => {
    let fullPath = `${__dirname}/${folder}`;
    deleteFolderRecursive(fullPath);
};

const saveFile = (folderPath, file) => {
    fileSystem.createWriteStream(`${folderPath}/${file.originalname}`);
    console.log(`file ${file.originalname} added`);

    return file.originalname;
}

const deleteFolderRecursive = (path) => {
    if (fileSystem.existsSync(path)) {
        fileSystem.readdirSync(path).forEach((file, index) => {
            var curPath = path + "/" + file;

            if (fileSystem.lstatSync(curPath).isDirectory())
                deleteFolderRecursive(curPath);
            else
                fileSystem.unlinkSync(curPath);

            console.log('deleted file');
        });

        fileSystem.readdirSync(path, (err, files) => {
            if (!err) {
                if (!files.length) {
                    fileSystem.rmdirSync(path);
                } else {
                    deleteFolderRecursive(path);
                }
            }
        });

        console.log('deleted folder');
    }
};
