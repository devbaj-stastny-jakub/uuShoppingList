export interface ShoppingList {
    id: string
    name: string
    description: string
    image: string
    isArchived: boolean
    ownerId: string
    membersIds: string[]
    items: ShoppingListItem[]
    profile: "owner" | "member"
    createdAt: string
    updatedAt: string | null
}

export interface User {
    id: string
    user_id: string
    email: string
    name: string
    username: string
    password: string
    picture: string
    created_at: string
    updated_at: string
}

export interface UpdateShoppingListBody {
    id: string
    name?: string
    description?: string
    image?: string
    isArchived?: boolean
    ownerId?: string
    membersIds?: string[]
}

export interface CreateShoppingListItemBody {
    name: string
    shoppingListId: string
}

export interface UpdateShoppingListItemBody {
    id: string
    solved?: boolean
    name?: string
    shoppingListId: string
}

export interface DeleteShoppingListItemDelete {
    shoppingListId: string
    id: string
}

export interface ShoppingListItem {
    id: string
    name: string
    solved: boolean
    createdAt: string
}
