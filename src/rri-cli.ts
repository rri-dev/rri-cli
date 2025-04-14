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

    static createApiTemplate = async function()  {
        RriCli.logMsg('Creating an api template');

        const answer = await input({
            
            message: 'Enter brief name/abbreviation (the name will be prefixed with "rri" and suffixed with "api")',
            validate: (input) => {
                if (input.startsWith("rri")) return 'name will be prefixed with rri, please choose a different name';
                if (input.endsWith("api")) return 'name will be suffixed with api, please choose a different name';
                return true;
            }
            
        }).then((i) => `rri-${i.toLowerCase()}-api`);

        RriCli.createTemplateFromName(answer, 'rri-api-template');
        
    }

    static createMicroserviceTemplate = async function() {
        RriCli.logMsg('creating a microservice template');
    }

    static createNpmPackageTemplate = async function () {
        const answer = await input({
            
            message: 'Enter brief name/abbreviation (the name will be prefixed with "rri" and suffixed with "np")',
            validate: (input) => {
                if (input.startsWith("rri")) return 'name will be prefixed with rri, please choose a different name';
                if (input.endsWith("np")) return 'name will be suffixed with api, please choose a different name';
                return true;
            }
            
        }).then((i) => `rri-${i.toLowerCase()}-np`);

        RriCli.createTemplateFromName(answer, 'rri-npm-template');
        RriCli.logMsg(`next steps ####`, '       #### ', 'yellow');
        RriCli.logMsg(`cd ${answer}`, '       ---> ', 'yellow');
        RriCli.logMsg(`code .`, '       ---> ', 'yellow');
        RriCli.logMsg(`======================`, '=');
    }

    static createTemplateFromName(projectName: string, templateName: string) {
        
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
            RriCli.logMsg(`Template path '${templatePath}' does not exist.`);
        }
    }
}