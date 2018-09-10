var FileManager = require('../core/file.manager');

exports.init = (dependencies) => {
    if (!dependencies)
        throw new Error(`the dependency is undefined.`);

    this.dependencies = dependencies;
    FileManager.init(dependencies);
}

exports.upload = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let folder = req.body.folder;

            console.log('Prepare to upload');
            let pathFiles = FileManager.saveFile(folder, req.files);
            if (!pathFiles) {
                reject({
                    errorMessage: 'The file cannot saved in the server'
                });
            }

            let files = [];
            pathFiles.forEach((element) => {
                console.log(`Prepare to storage the file ${element}`);

                files.push(`${folder}/${element}`);
                FileManager.upload(folder, element);
            });

            FileManager.deleteFolder(folder);

            resolve({
                message: 'Files uploaded successfully'
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
