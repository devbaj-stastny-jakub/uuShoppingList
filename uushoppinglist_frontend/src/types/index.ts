export interface ShoppingList {
    id: string
    name: string
    description: string
    image: string
    archived: boolean
    ownerId: string
    membersIds: string[]
    items: ShoppingListItem[]
    profile: "owner" | "member"
}

export interface ShoppingListItem {
    id: string
    name: string
    solved: boolean
}
