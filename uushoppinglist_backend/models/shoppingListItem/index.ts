import Ajv, {JSONSchemaType, str} from "ajv"
import {ThrowableError} from "../../errors";

const ajv = new Ajv()

const createModel = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1
        },
        shoppingListId: {
            type: "string",
            minLength: 24,
            maxLength: 24,
        }
    },
    required: ["name", "shoppingListId"],
    additionalProperties: false
}
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
        solved: {
            type: "boolean"
        },
        shoppingListId: {
            type: "string",
            minLength: 24,
            maxLength: 24,
        }
    },
    required: ["id", "shoppingListId"],
    additionalProperties: false
}
const deleteModel = {
    type: "object",
    properties: {
        id: {
            type: "string",
            maxLength: 24,
            minLength: 24
        },
        shoppingListId: {
            type: "string",
            minLength: 24,
            maxLength: 24,
        }
    },
    required: ["id", "shoppingListId"],
    additionalProperties: false
}

const validate = (model, data)=>{
    const validator = ajv.compile(model)
    const valid = validator(data)
    if(!valid) {
        throw ThrowableError(validator.errors?.[0].message, 400, "shoppingListItem.validation")
    }
}

export const shoppingListItemModel = {
    createModel: {
        validate: (data: any)=>{validate(createModel, data)}
    },
    updateModel: {
        validate: (data: any)=>{validate(updateModel, data)}
    },
    deleteModel: {
        validate: (data: any)=>{validate(deleteModel, data)}
    }
}
