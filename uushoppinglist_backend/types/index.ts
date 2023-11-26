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

export interface ShoppingList {
    id: string
    name: string
    description: string | null
    image: string
    isArchived: boolean
    ownerId: string
    membersIds: string[]
    items: ShoppingListItem[]
    profile?: "member" | "owner"
    createdAt: string
    updatedAt: string | null
}

export interface ShoppingListItem {
    id: string
    name: string
    solved: boolean
    createdAt: string
}
