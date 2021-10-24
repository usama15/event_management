import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartData: [],
    // count:[]
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
            let {cartData} = state.initialState
            cartData = cartData.filter(data => action.payload !== data.id)
        },

        // getCount:(state, {payload}) => {
        //     let {} = state.initialState
        // }
    },
});


export default cartReducer.reducer;
export const {addToCart} = cartReducer.actions;