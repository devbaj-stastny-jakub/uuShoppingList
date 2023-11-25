"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowableError = void 0;
const throwableErrorLocal = {
    message: null,
    status: 400,
    code: null,
};
const ThrowableError = (message, status, code) => {
    return Object.assign(Object.assign({}, throwableErrorLocal), { message, status, code });
};
exports.ThrowableError = ThrowableError;
