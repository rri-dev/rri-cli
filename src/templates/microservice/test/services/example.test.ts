import { ExampleService } from '../../src/services/example';
import sinon from 'sinon';
import { expect } from 'chai';

// TODO: need to get these tests working
describe('ExampleService', function () {

    beforeEach(() => {
        
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('printMessage', function() {

        it('should test one of the things', async function() {

            // setup
            const svc = new ExampleService();
    
            // run target
            svc.printMessage();
    
            // test outcome


        });

    });
    
});