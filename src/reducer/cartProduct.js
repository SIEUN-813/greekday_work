import { createSlice } from "@reduxjs/toolkit"

const initState = {
    cart: ''
}
const cartProduct = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        cartMethod: (state, action)=>{
            state.cart = action.payload;
        }
    }
});

export default cartProduct.reducer;
export const { cartMethod } = cartProduct.actions;