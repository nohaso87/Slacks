import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    messages: [],
    currentDirect: null,
    listOfDirects: [],
    countOfDirects: 0,
}

const DirectSlice = createSlice({
    name: 'direct',
    initialState: INITIAL_STATE,
    reducers: {
        setDirectMessages: (state, { payload }) => {
            state.messages = payload
        },
        setCurrentDirect: (state, {payload}) => {
            state.currentDirect = payload
        },
        loadDirectList: (state, { payload }) => {
          state.listOfDirects = payload;
          state.countOfDirects = payload.length;
        },
        resetDirect: () => INITIAL_STATE
    }
})

export const { setDirectMessages, setCurrentDirect, loadDirectList, resetDirect } = DirectSlice.actions

export default DirectSlice.reducer