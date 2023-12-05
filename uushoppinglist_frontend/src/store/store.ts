import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from "./shoppingListSlice"
import shoppingListsListReducer from "./shoppingListsListSlice"
import errorReducer from "./errorSlice"
import settingsReducer from "./settingsSlice"

export const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        shoppingListsList: shoppingListsListReducer,
        error: errorReducer,
        settings: settingsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
