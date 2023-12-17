"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingListModel = void 0;
const ajv_1 = __importDefault(require("ajv"));
const errors_1 = require("../../errors");
const ajv = new ajv_1.default();
const identifierModel = {
    type: "string",
    maxLength: 24,
    minLength: 24
};
const updateModel = {
    type: "object",
    properties: {
        id: {
            type: "string",
            minLength: 24,
            maxLength: 24,
        },
        name: {
            type: "string",
            minLength: 1
        },
        description: {
            type: "string",
            minLength: 1
        },
        image: {
            type: "string",
            nullable: true
        },
        isArchived: {
            type: "boolean",
        },
        ownerId: {
            type: "string",
        },
        membersIds: {
            type: "array",
            items: {
                type: "string",
            }
        },
        /*items: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        minLength: 24,
                        maxLength: 24
                    },
                    name: {
                        type: "string",
                        minLength: 1
                    },
                    solved: {
                        type: "boolean"
                    }
                }
            }
        },*/
    },
    required: ["id"],
    additionalProperties: false
};
const deleteModel = {
    type: "object",
    properties: {
        id: {
            type: "string",
            maxLength: 24,
            minLength: 24
        }
    },
    required: ["id"],
    additionalProperties: false
};
const validate = (model, data) => {
    var _a;
    const validator = ajv.compile(model);
    const valid = validator(data);
    if (!valid) {
        throw (0, errors_1.ThrowableError)((_a = validator.errors) === null || _a === void 0 ? void 0 : _a[0].message, 400, "shoppingList.validation");
    }
};
exports.shoppingListModel = {
    identifierModel: {
        validate: (data) => { validate(identifierModel, data); }
    },
    updateModel: {
        validate: (data) => { validate(updateModel, data); }
    },
    deleteModel: {
        validate: (data) => { validate(deleteModel, data); }
    }
};
