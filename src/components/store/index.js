import { configureStore } from "@reduxjs/toolkit";

import ChannelReducer from  '../features/Channels/ChannelSlice'
import UserReducer from '../features/Users/UserSlice'
import RepliesReducer from "../features/Replies/ReplySlice";
import DirectReducer from "../features/Direct/DirectSlice";

export const store = configureStore({
    reducer : {
        channels: ChannelReducer,
        user: UserReducer,
        replies: RepliesReducer,
        direct: DirectReducer
    }
})

// I need to create the Replies reducer