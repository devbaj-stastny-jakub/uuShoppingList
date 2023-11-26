import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from "./shoppingListSlice"
import shoppingListsListReducer from "./shoppingListsListSlice"
import errorReducer from "./errorSlice"

export const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        shoppingListsList: shoppingListsListReducer,
        error: errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
