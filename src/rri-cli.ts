import {  input } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export class RriCli {

    static logMsg(msg: string, logPrefix: undefined | string = undefined, color: undefined | string = undefined) {
        if (!logPrefix) logPrefix = `----->`;
        if (!color) color = 'blue';
        // @ts-ignore
        console.log(chalk[color](`${logPrefix}${msg}`));
    }

    static suffixMap = {
        'api': 'api',
        'microservice': 'ms',
        'npm': 'np',
        'test': 'test'
    }

    static async createTemplateFromName(templateName: string) {

        // @ts-ignore
        const suffix = RriCli.suffixMap[templateName];
        const projectName = await input({
            
            message: `Enter brief name/abbreviation (the name will be prefixed with "rri" and suffixed with "${suffix}")`,
            validate: (input) => {
                if (input.startsWith("rri")) return 'name will be prefixed with rri, please choose a different name';
                if (input.endsWith("np")) return 'name will be suffixed with api, please choose a different name';
                return true;
            }
            
        }).then((i) => `rri-${i.toLowerCase()}-${suffix}`);
        
        const folderPath = `./${projectName}`;
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        } else {
            throw new Error(`Folder '${folderPath}' already exists.`);
        }
        const templatePath = path.resolve(__dirname, `../src/templates/${templateName}`);

        if (fs.existsSync(templatePath)) {
            fs.readdirSync(templatePath, { withFileTypes: true }).forEach((entry) => {
                const srcPath = `${templatePath}/${entry.name}`;
                const destPath = `${folderPath}/${entry.name}`;

                if (entry.isDirectory()) {
                    fs.mkdirSync(destPath, { recursive: true });
                    fs.readdirSync(srcPath).forEach((file) => {
                        fs.copyFileSync(`${srcPath}/${file}`, `${destPath}/${file}`);
                    });
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            });
            RriCli.logMsg(`Template created at ${folderPath}`);
        } else {
            throw new Error(`Template path '${templatePath}' does not exist.`);
        }

        RriCli.logMsg(`next steps ####`, '       #### ', 'yellow');
        RriCli.logMsg(`cd ${templateName}`, '       ---> ', 'yellow');
        RriCli.logMsg(`npm i && git init`, '       ---> ', 'yellow');
        RriCli.logMsg(`code .`, '       ---> ', 'yellow');
        RriCli.logMsg(`======================`, '=');
    }
}