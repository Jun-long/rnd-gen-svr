"use strict";

const assert = require("assert");
const _ = require("lodash");

class Context {
    constructor() {
        this._appOptions = {};

        this._modules = new Map();

        // for koa framework instance
        this._koaInst = null;
        // for socketio server instance.
        this._socketio = null;
    }

    get AppOptions() {
        return this._appOptions;
    }

    set AppOptions(opts) {
        this._appOptions = opts;
    }

    get KoaApp() {
        return this._koaInst;
    }

    set KoaApp(inst) {
        this._koaInst = inst;
    }

    get SocketIO() {
        return this._socketio;
    }

    set SocketIO(inst) {
        this._socketio = inst;
    }

    appendModule(name, inst) {
        assert(_.isString(name) && name != "", "name must be unempty string");
        if (this._modules.has(name)) {
            return;
        }

        this._modules.set(name, inst);
    }

    getModule(name) {
        assert(_.isString(name) && name != "", "name must be unempty string");
        if (!this._modules.has(name)) {
            return null;
        }

        return this._modules.get(name);
    }
}

const gContext = new Context();
module.exports = gContext;