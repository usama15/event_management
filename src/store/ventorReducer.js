import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ventorData: [],
}

const ventorReducer = createSlice({
    name: 'ventor',
    initialState:{initialState},
    reducers:{
        loginVentor:(state, {payload}) => {
            state.initialState = payload
        },
    },
});

export default ventorReducer.reducer;
export const {loginVentor} = ventorReducer.actions;