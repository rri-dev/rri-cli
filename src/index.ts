#!/usr/bin/env node
import { select, Separator } from '@inquirer/prompts';
import { RriCli } from './rri-cli';

async function run() {

    try {
        const answer = await select({
            message: 'Choose a template to create:',
            choices: [
                { name: 'API', value: 'api', description: 'Generic crud operations for integrating with an external system' },
                { name: 'Microservice', value: 'microservice', description: 'Lightweight NodeJs program to separate concerns' },
                { name: 'NPM Package', value: 'npm', description: 'Abstract away services to be consumed by other packages' },
                { name: 'Exit', value: 'exit', description: 'Exit the program' },
                new Separator()
            ],
        });
        await RriCli.createTemplateFromName(answer);

    } catch (error) {
        console.error('An error occurred:', error);
    }

}

run();