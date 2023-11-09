import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from "./shoppingListSlice"
import shoppingListsListReducer from "./shoppingListsListSlice"

export const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        shoppingListsList: shoppingListsListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
