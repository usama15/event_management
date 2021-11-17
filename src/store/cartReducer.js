import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartData: [],
}

const cartReducer = createSlice({
    name: 'cart',
    initialState:{initialState},
    reducers:{
        addToCart:(state, {payload}) => {
            const {cartData} = state.initialState
            let flag = false;
            cartData.map((data) => {
                if (data.id == payload.id) {
                     flag = true;
                }
            })
            if (flag === true) {
                alert('Post Avabile')
            } else {
                    state.initialState.cartData = [...state.initialState.cartData, payload];
            }
        },

        removeFromCart:(state, {payload}) => {
           state.initialState.cartData = []
        },


    },
});


export default cartReducer.reducer;
export const {addToCart} = cartReducer.actions;
export const {removeFromCart} = cartReducer.actions;