import Ajv, {JSONSchemaType, str} from "ajv"

const ajv = new Ajv()

const identifierModel = {
    type: "string",
    maxLength: 24,
    minLength: 24
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
        description: {
            type: "string",
            minLength: 1
        },
        image: {
            type: "string",
            nullable: true
        },
        archived: {
            type: "boolean",
        },
        ownerId: {
            type: "string",
            minLength: 24,
            maxLength: 24
        },
        membersIds: {
            type: "array",
            items: {
                type: "string",
                minLength: 24,
                maxLength: 24
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
}
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
}

export const shoppingListModel = {
    identifierModel: {
        validate: ajv.compile(identifierModel)
    },
    updateModel: {
        validate: ajv.compile(updateModel)
    },
    deleteModel: {
        validate: ajv.compile(deleteModel)
    }
}
