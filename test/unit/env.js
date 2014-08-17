var should = require('chai').should();
var appolo  = require('../../index');


describe('environments', function () {

    beforeEach(function(){

    })

    afterEach(function(){
        appolo.launcher.reset();
    })


    it('should create dev environment ', function () {

        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock'
        });

        should.exist(appolo.environment.test);

        appolo.environment.test.should.be.equal("testDev")
        appolo.environment.type.should.be.equal("development")
    });


    it('should create dev environment ', function () {

        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock',
            environment:'production'
        });

        should.exist(appolo.environment.test);

        appolo.environment.test.should.be.equal("testProd")

        appolo.environment.type.should.be.equal("production")
    });
});