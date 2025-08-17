import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state,action){
            state.push(action.payload)
        },
        deletefromCart(state,action){
            return state.filter(item=>item.id!= action.payload.id)
        }
    }
})

export const {addToCart,deletefromCart}= cartSlice.actions;

export default cartSlice.reducer; 