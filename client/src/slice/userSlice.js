import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: 'user',
    initialState: {
        nome: '',
        email: '',
    },
    reducers: {
        set_name(state, { payload }){
            return{...state, nome: payload}
        },
        set_email(state, { payload }){
            return{...state, email: payload}
        }
    }
})

export const {set_name, set_email} = slice.actions

export const selectUser = state => state.user

export default slice.reducer