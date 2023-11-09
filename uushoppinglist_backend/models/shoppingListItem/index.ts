import Ajv, {JSONSchemaType, str} from "ajv"

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

export const shoppingListItemModel = {
    createModel: {
        validate: ajv.compile(createModel)
    },
    updateModel: {
        validate: ajv.compile(updateModel)
    },
    deleteModel: {
        validate: ajv.compile(deleteModel)
    }
}
