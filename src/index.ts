#!/usr/bin/env node
import { select, Separator, input, confirm } from '@inquirer/prompts';
import { RriCli } from './rri-cli';

async function run() {

    try {
        const operation = await select({
            message: 'Choose an operation',
            choices: [
                { name: 'Create a Template', value: 'template', description: 'Create a boilerplate template for various purposes (API, NPM Package, etc.)' },
                { name: 'Generate Backdoor User String', value: 'bd-string', description: 'Generate a value for BACKDOOR_USERS env var' },
                { name: 'Exit', value: 'exit', description: 'Exit the program' },
                new Separator()
            ]
        });

        if (operation === 'exit') process.exit();

        if (operation === 'template') {
            const answer = await select({
                message: 'Choose a template to create:',
                choices: [
                    { name: 'API', value: 'api', description: 'Generic crud operations for integrating with an external system' },
                    { name: 'Microservice', value: 'microservice', description: 'Lightweight NodeJs program to separate concerns' },
                    { name: 'NPM Package', value: 'npm', description: 'Abstract away services to be consumed by other packages' },
                    { name: 'Test Suite', value: 'test', description: 'Stand alone template for building integration tests' },
                    { name: 'Exit', value: 'exit', description: 'Exit the program' },
                    new Separator()
                ],
            });
            if (answer === 'exit') process.exit();
            await RriCli.createTemplateFromName(answer);
        }

        if (operation === 'bd-string') {

            const adminUsers = [], superUsers = [];
            adminUsers.push(await getUser('admin'));
            superUsers.push(await getUser('superuser'));

            let finished = await finishedAddingUsers();
            while (!finished) {
                
                const roleToAdd = await select({
                    message: 'What type of user?',
                    choices: [
                        { name: 'Admin', value: 'admin', description: 'Has access to oauth settings, bull queues, and api docs' },
                        { name: 'Super User', value: 'superuser', description: 'Has access to api docs' },
                    ]
                });

                if (roleToAdd === 'admin') adminUsers.push(await getUser('admin'));
                if (roleToAdd === 'superuser') superUsers.push(await getUser('superuser'));

                finished = await finishedAddingUsers();
                
                if (finished) break;

            }

            const allUsers = [...adminUsers, ...superUsers];
            console.log('\n------------------------------------------------------');
            console.log(' place this string in the BACKDOOR_USERS env var of the app: \n', JSON.stringify(allUsers));
            console.log('------------------------------------------------------\n');
        }

        
        

    } catch (error) {
        console.error('An error occurred:', error);
    }

}

async function getUser(role: "admin" | "superuser") {
    if (role !== "admin" && role !== "superuser") throw new Error(`unsupported role: ${role}`);

    const userName = await input({
        message: `Enter ${role} user name:`,
        validate: (input: string) => input.trim() !== '' || 'User name cannot be empty',
        default: 'some-user',
    });

    const password = await input({
        message: `Enter ${role} password:`,
        validate: (input: string) => input.trim() !== '' || 'Password cannot be empty',
        default: 'some-password'
    });

    return {
        user: userName,
        password: password,
        role: role
    }
}

async function finishedAddingUsers() {
    return await confirm({
        message: 'Are you finished adding users?',
        default: true
    });
}

run();