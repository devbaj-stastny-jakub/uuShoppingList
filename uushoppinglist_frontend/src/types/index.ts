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
