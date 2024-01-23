import { createSlice } from "@reduxjs/toolkit"

const initState = {    
    recentlyViewProduct: []
}

const recentlyViewProductReducer = createSlice({
    name: 'recentlyViewProduct',
    initialState: initState,
    reducers: {
        recentlyViewProduct: (state, action)=>{
            state.recentlyViewProduct = action.payload;
        }
    }
});

export default recentlyViewProductReducer.reducer;
export const {recentlyViewProduct} = recentlyViewProductReducer.actions;
