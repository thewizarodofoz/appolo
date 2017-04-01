"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let should = require('chai').should();
const appolo = require("../../index");
describe('define', function () {
    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });
    afterEach(function () {
        appolo.launcher.reset();
    });
    it('should define class', function () {
        let $config = {
            id: 'test'
        };
        appolo.define($config, class Test {
        });
        let injector = appolo.inject;
        let test = injector.getObject('test');
        should.exist(test);
    });
    it('should define class namespace', function () {
        let $config = {
            id: 'test',
            namespace: 'Apoolo.Testing.Test'
        };
        class Test {
        }
        appolo.define($config, Test);
        should.exist(global.Apoolo.Testing.Test);
        var injector = appolo.inject;
        var test = injector.getObject('test');
        test.should.be.instanceof(Test);
        global.Apoolo.Testing.Test.should.be.eq(Test);
    });
    it('should define class statics', function () {
        let $config = {
            id: 'test',
            statics: {
                TEST: 1
            }
        };
        class Test {
            toString() {
                return this.TEST;
            }
        }
        appolo.define($config, Test);
        let injector = appolo.inject;
        let test = injector.getObject('test');
        Test.TEST.should.be.eq(1);
        test.TEST.should.be.eq(1);
        test.toString().should.be.eq(1);
    });
    it('should define class static config', function () {
        let manager2 = appolo.inject.getObject('manager2');
        should.exist(manager2);
        should.exist(manager2.manager);
        manager2.manager.run().should.be.ok;
    });
    it('should define class with linq', function () {
        let manager3 = appolo.inject.getObject('manager3');
        should.exist(manager3);
        should.exist(manager3.manager);
        manager3.manager.run().should.be.ok;
        should.exist(global.Test.Manager3);
        manager3.TEST.should.be.eq(1);
        manager3.TEST2.should.be.eq(2);
        global.Test.Manager3.TEST2.should.be.eq(2);
    });
    it('should define only namespace', function () {
        class Test {
        }
        appolo.define(Test).namespace('Test1.Test2');
        should.exist(global.Test1.Test2);
        global.Test1.Test2.should.be.eq(Test);
    });
    it('should define only statics', function () {
        class Test {
        }
        appolo.define(Test).statics('Test1', 'Test2');
        Test.Test1.should.be.eq('Test2');
    });
    it('should define mixsins', function () {
        class Test {
            on(event, fn) {
                return true;
            }
            un(event, fn) {
                return true;
            }
        }
        class Test2 {
        }
        appolo.define(Test2).mixins(Test);
        let test = new Test2();
        test.on().should.be.ok;
    });
});
//# sourceMappingURL=define.js.map