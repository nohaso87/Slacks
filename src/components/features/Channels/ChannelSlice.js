import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  listOfChannels: [],
  countOfChannels: 0,
  activeChannel: {
    name: "",
    description: "",
    createdAt: "",
    createdBy: "",
  },
  selectedChannel: "",
  totalUsers: 0,
  topPosters: {}
};

const ChannelSlice = createSlice({
  name: "channels",
  initialState: INITIAL_STATE,
  reducers: {
    loadChannelList: (state, { payload }) => {
      state.listOfChannels = payload;
      state.countOfChannels = payload.length;
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannel.name = payload.latest;
      state.activeChannel.description = payload.description;
      state.activeChannel.createdAt = payload.createdAt_seconds;
      state.activeChannel.createdBy = payload.createdBy;
    },
    setTotalUsersCount: (state, {payload}) => {
      state.totalUsers = payload
    },
    setTopPosters: (state, {payload}) =>{
      state.topPosters = payload
      console.log(state.topPosters)
    },
    resetChannel: () => INITIAL_STATE
  },
});

export const { loadChannelList, setActiveChannel, selectChannel, setTotalUsersCount, setTopPosters, resetChannel } = ChannelSlice.actions;

export default ChannelSlice.reducer;
