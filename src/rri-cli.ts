import {  input } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { cp } from 'fs/promises';

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
                if (input.startsWith("rri")) return `name will be prefixed with rri, please choose a different name`;
                if (input.endsWith(suffix)) return `name will be suffixed with ${suffix}, please choose a different name`;
                return true;
            }
            
        }).then((i) => `rri-${i.toLowerCase()}-${suffix}`);
        
        const destFolder = `./${projectName}`;
        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder);
        } else {
            throw new Error(`Folder '${destFolder}' already exists.`);
        }
        const sourceFolder = path.resolve(__dirname, `../src/templates/${templateName}`);

        await cp(sourceFolder, destFolder, { recursive: true });
        RriCli.logMsg(`Template created at ${destFolder}`);

        RriCli.logMsg(`next steps ####`, '       #### ', 'yellow');
        RriCli.logMsg(`cd ${projectName}`, '       ---> ', 'yellow');
        RriCli.logMsg(`npm i && git init`, '       ---> ', 'yellow');
        RriCli.logMsg(`code .`, '       ---> ', 'yellow');
        RriCli.logMsg(`======================`, '=');
    }
}