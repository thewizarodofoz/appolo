"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const appolo = require("../../index");
let should = chai.should();
describe('bootstrap', function () {
    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });
    afterEach(function () {
        appolo.launcher.reset();
    });
    it('should have  call bootstrap initialize', function () {
        let injector = appolo.inject;
        let bootstrap = injector.getObject('appolo-bootstrap');
        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.manager.run().should.be.ok;
        bootstrap.working.should.be.ok;
    });
});
//# sourceMappingURL=bootstrap.js.map