export class RriCli {
    printMsg = function() {
        console.log("this is a message from the demo package");
    }

    static createApiTemplate = async function()  {
        console.log('creating an api template');
    }

    static createMicroserviceTemplate = async function() {
        console.log('creating a microservice template');
    }

    static createNpmPackageTemplate = async function () {
        console.log('creating an npm package template');
    }
}