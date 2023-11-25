import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ShoppingList} from "../types";

export interface ShoppingListState {
    shoppingList: ShoppingList | null
    profile: "owner" | "member"
    users: any[]
}

const initialState: ShoppingListState = {
    shoppingList: null,
    profile: "member",
    users: []
}

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<"member" | "owner">) => {
            state.profile = action.payload
        },
        removeAuthorizedUser: (state, action: PayloadAction<string>) => {
            if (!state.shoppingList) return;
            state.shoppingList.membersIds = state.shoppingList.membersIds.filter(memberId=>memberId !== action.payload)
        },
        addAuthorizedUser: (state, action: PayloadAction<string>) => {
            if (!state.shoppingList) return;
            state.shoppingList.membersIds.push(action.payload)
        },
        setAuthorizedUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload
        },
        setShoppingList: (state, action: PayloadAction<ShoppingList>) => {
            state.shoppingList = action.payload
            state.profile = action.payload.profile
        },
        editShoppingListValues: (state, action: PayloadAction<{ key: keyof ShoppingList, value: any }[]>) => {
            action.payload.forEach(change => {
                if (!state.shoppingList) return;
                // @ts-expect-error: Idk?
                state.shoppingList[change.key] = change.value
            })
        },
        setShoppingListItemState: (state, action: PayloadAction<{ id: string, checked: boolean }>) => {
            if (!state.shoppingList) return;
            const targetItemIndex = state.shoppingList.items.findIndex(shoppingListItem => shoppingListItem.id === action.payload.id);
            if (targetItemIndex === -1) return;
            state.shoppingList.items[targetItemIndex].solved = action.payload.checked;
        },
        createShoppingListItem: (state, action: PayloadAction<string>) => {
            if (!state.shoppingList) return;
            state.shoppingList.items.push({
                id: Math.floor(Math.random() * 100000).toString(),
                name: action.payload,
                solved: false,
                createdAt: new Date().toISOString()
            })
        },
        deleteShoppingListItem: (state, action: PayloadAction<string>) => {
            if (!state.shoppingList) return;
            const targetItemIndex = state.shoppingList.items.findIndex(shoppingListItem => shoppingListItem.id === action.payload);
            if (targetItemIndex === -1) return;
            state.shoppingList.items.splice(targetItemIndex, 1)
        }
    }
})

export const {
    removeAuthorizedUser,
    setProfile,
    addAuthorizedUser,
    setAuthorizedUsers,
    editShoppingListValues,
    setShoppingList,
    setShoppingListItemState,
    createShoppingListItem,
    deleteShoppingListItem
} = shoppingListSlice.actions

export default shoppingListSlice.reducer
