const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src/templates');

fs.readdir(templatesDir, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('Error reading templates directory:', err);
        return;
    }

    files.forEach((file) => {
        if (file.isDirectory()) {
            console.log('Directory:', file.name);
            const renameFiles = ['npmignore', 'gitignore'];
            for (const fileName of renameFiles) {

                const filePath = path.join(templatesDir, file.name, fileName);
                const newFilePath = path.join(templatesDir, file.name, `.${fileName}`);

                fs.access(filePath, fs.constants.F_OK, (accessErr) => {
                    if (!accessErr) {
                        fs.rename(filePath, newFilePath, (renameErr) => {
                            if (renameErr) {
                                console.error(`Error renaming file in ${file.name}:`, renameErr);
                            } else {
                                console.log(`Renamed "${fileName}" to ".${fileName}" in ${file.name}`);
                            }
                        });
                    }
                });
            }
        }
    });
});