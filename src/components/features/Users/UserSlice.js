import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    email: '',
    uid: '',
    username: '',
    userimg: '',
    starred: []
}

const UserSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, {payload}) => {
            state.username = payload.username
            state.uid = payload.uid
            state.email = payload.email
            state.userimg = payload.imgpath
        },
        setStarred: (state, {payload}) => {
            state.starred = payload

        },
        resetUser: () => INITIAL_STATE
    }
})

export const { setUser, setStarred, resetUser } = UserSlice.actions

export default UserSlice.reducer