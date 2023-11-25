"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBuilder = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json({
        inputData: Object.keys(req.body).length === 0 ? null : req.body,
        error: {
            message: (error === null || error === void 0 ? void 0 : error.message) || null,
            code: error === null || error === void 0 ? void 0 : error.code
        },
        result: null
    });
};
exports.errorHandler = errorHandler;
const responseBuilder = (result, req, res, next) => {
    if ((result === null || result === void 0 ? void 0 : result.status) !== undefined) {
        next(result);
        return;
    }
    res.send({
        inputData: Object.keys(req.body).length === 0 ? null : req.body,
        error: null,
        result: result
    });
};
exports.responseBuilder = responseBuilder;
