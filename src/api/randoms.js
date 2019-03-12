"use strict";

const KoaRouter = require("koa-router");

const appContext = require("../app-context");

const getinformationhandler = async ctx => {
    const query = ctx.query;
    let hash = null, idx = null;
    if (query.hash) {
        hash = query.hash;
    } else if (query.index) {
        const i = Number(query.index);
        if (Number.isSafeInteger(i)) {
            idx = i;
        }
    }

    try {
        const generator = appContext.getModule("random-generator");
        if (!generator) {
            throw new Error("no random generator module instance.");
        }
        let info = null;
        if (hash != null) {
            info = await generator.getInformationByRandom(hash);
        } else if (idx != null) {
            info = await generator.getInformationByIndex(idx);
        } else {
            ctx.body = {
                success: false,
                error: "Invalid query parameters",
                errorCode: -1
            };
            return;
        }

        // success
        if (info != null) {
            ctx.body = {
                success: true,
                data: { information: info }
            };
            return;
        }
    } catch (error) {
        void error;
    }

    ctx.body = {
        success: false,
        error: "Unknown exception",
        errorCode: -2
    };
};

const getrandomshandler = async ctx => {
    const query = ctx.query;
    const offset = Number.isSafeInteger(Number(query.offset))
        ? Number(query.offset)
        : 0;
    const limit = Number.isSafeInteger(Number(query.limit))
        ? Number(query.limit)
        : 100;
    try {
        const generator = appContext.getModule("random-generator");
        if (!generator) {
            throw new Error("no random generator module instance.");
        }
        const count = await generator.getCount();
        const rnds = await generator.getRandoms(offset, limit);
        if (rnds != null) {
            ctx.body = {
                success: true,
                data: { randoms: rnds, count }
            };
            return;
        }
    } catch (error) {
        void error;
    }

    ctx.body = {
        success: false,
        error: "Not found randoms in range.",
        errorCode: -2
    };
};

const getcounthandler = async ctx => {
    try {
        const generator = appContext.getModule("random-generator");
        if (!generator) {
            throw new Error("no random generator module instance.");
        }
        const count = await generator.getCount();
        ctx.body = {
            success: true,
            data: { count }
        };
        return;
    } catch (error) {
        void error;
    }

    ctx.body = {
        success: false,
        error: "Not found random count.",
        errorCode: -2
    };
};

module.exports = (app, opts) => {
    void opts;
    const router = new KoaRouter();

    router.get("/random/getInfo", getinformationhandler);
    router.get("/random/get", getrandomshandler);
    router.get("/random/count", getcounthandler);

    app.use(router.routes());
};