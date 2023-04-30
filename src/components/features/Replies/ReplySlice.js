import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    replies: []
}

const Replysplice = createSlice({
    name: 'replies',
    initialState: INITIAL_STATE,
    reducers: {
        getRoomReplies : (state, payload) => {
            state.replies = payload.payload
        },
        resetReply: () => INITIAL_STATE
    }
})

export const { getRoomReplies, resetReply } = Replysplice.actions

export default Replysplice.reducer