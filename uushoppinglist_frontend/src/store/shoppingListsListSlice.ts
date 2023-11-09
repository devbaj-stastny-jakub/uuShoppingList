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
    }
})

export const {
    setShoppingLists
} = shoppingListsListSlice.actions

export default shoppingListsListSlice.reducer
