import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface errorSliceState {
    message: string | null
}

const initialState: errorSliceState = {
    message: null
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload
        }
    }
})

export const {
    setError,
} = errorSlice.actions

export default errorSlice.reducer
