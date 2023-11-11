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
    description: string
    image: string
    archived: boolean
    ownerId: string
    membersIds: string[]
    items: ShoppingListItem[]
    profile?: "member" | "owner"
}

export interface ShoppingListItem {
    id: string
    name: string
    solved: boolean
}
