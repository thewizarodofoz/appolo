"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../index");
const chai = require("chai");
let should = chai.should();
describe("event dispatcher", function () {
    class EventHandler {
        constructor(dispatcher) {
            this.dispatcher = dispatcher;
        }
        handle() {
            this.dispatcher.un('topic', this.handle, this);
        }
    }
    it('can un-subscribe from event while handling the event itself', function () {
        let dispatcher = new appolo.EventDispatcher();
        let handler1 = new EventHandler(dispatcher);
        let handler2 = new EventHandler(dispatcher);
        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);
        (function () { dispatcher.fireEvent('topic'); }).should.not.throw();
        // dispatcher.fireEvent('topic').should.not.throw();
    });
});
//# sourceMappingURL=eventDispatcher.js.map