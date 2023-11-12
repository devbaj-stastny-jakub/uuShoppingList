import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ShoppingList} from "../types";

export interface ShoppingListsListState {
    shoppingLists: ShoppingList[]
}

const initialState: ShoppingListsListState = {
    shoppingLists: [],
}

export const shoppingListsListSlice = createSlice({
    name: 'shoppingLists',
    initialState,
    reducers: {
        setShoppingLists: (state, action: PayloadAction<ShoppingList[]>) => {
            state.shoppingLists = action.payload
        },
        deleteShoppingList: (state, action: PayloadAction<string>) => {
            state.shoppingLists = state.shoppingLists.filter(list=>list.id !== action.payload)
        },
    }
})

export const {
    setShoppingLists,
    deleteShoppingList
} = shoppingListsListSlice.actions

export default shoppingListsListSlice.reducer
