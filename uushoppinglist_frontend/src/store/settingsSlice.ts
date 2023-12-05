import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface settingsSliceState {
    colorMode: "light" | "dark"
    language: string
}

const initialState: settingsSliceState = {
    colorMode: "light",
    language: "cz"
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleColorMode: (state) => {
            state.colorMode = state.colorMode === "light" ? "dark" : "light"
        },
        setColorMode: (state, action: PayloadAction<"light" | "dark">) => {
            state.colorMode = action.payload
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        },
    }
})

export const {
    toggleColorMode,
    setColorMode,
    setLanguage
} = settingsSlice.actions

export default settingsSlice.reducer
