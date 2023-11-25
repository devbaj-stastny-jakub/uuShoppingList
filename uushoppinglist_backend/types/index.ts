export interface User {
    sub: string
    nickname: string
    name: string
    picture: string
    updated_at: string
    email: string
    email_verified: boolean
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
