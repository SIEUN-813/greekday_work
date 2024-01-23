import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isConfirmModal: false,
    confirmMsg: '',
}

const confirmModalReducer = createSlice({
    name: 'confirmModal',
    initialState: initState,
    reducers: {
        confirmModal: (state, action)=>{
            state.isConfirmModal = action.payload.isConfirmModal;
            state.confirmMsg = action.payload.confirmMsg;
        }
    }
});

export default confirmModalReducer.reducer;
export const { confirmModal } = confirmModalReducer.actions;