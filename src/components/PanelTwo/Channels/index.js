import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import * as General from "../../Style";
import * as local from "./ChannelElements";

// Components
import AddChannel from "../AddChannel";
import {
  loadChannelList,
  setActiveChannel
} from "../../features/Channels/ChannelSlice";

// Firebase
import { auth, db } from "../../../Config/Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Utility } from "../../../Utility";
import { setCurrentDirect } from "../../features/Direct/DirectSlice";
import { ThreeDots } from "react-loading-icons";

function Channels({roomdataprop, getselectedroomprop}) {
  const [ user ] = useAuthState(auth)
  const [visible, setVisible] = useState(false);
  const { countOfChannels, listOfChannels } = useSelector(
    (state) => state.channels
  );

  const utility = Utility()

  const dispatch = useDispatch();

  // Load Channels
  useEffect(() => {
    let subscribed = false

    const getAllChannels = () => {
      // Queries for all the channels 
      const channelRef = collection(db, "channels");
      const channelQuery = query(channelRef, orderBy('createdAt', 'desc'))
  
      onSnapshot(channelQuery, (snapshot) => {
        let channels = [];
        let channelData  = []
        snapshot.forEach((data) => {
          channels.push(data.id)
          channelData.push(utility.flattenObject(data.data()));
        });
        dispatch(loadChannelList(channels));
  
        if (channelData[0]){
          channelData[0].latest = channels[0]
          dispatch(setActiveChannel(channelData[0]))
        }
        
      })
    }
    if (!subscribed){
      getAllChannels()
    }

    return () =>{
      subscribed = true
    }
  },[]);

  const handleChannelSelection = (selected) => {
    roomdataprop(selected)
    getselectedroomprop(selected)
    dispatch(setCurrentDirect(null))
  }
  const toggleAddNewChannel = () => {
    setVisible(!visible);
  };

  return (
    {user} && <General.Section>
    <AddChannel tools={toggleAddNewChannel} status={visible} />
      <General.Header>
        <local.Logo></local.Logo>
        <General.Name>CHANNELS ({countOfChannels})</General.Name>
        <local.Add onClick={toggleAddNewChannel}></local.Add>
      </General.Header>
      <General.List>
        {
          // Channel list
          listOfChannels.length > 0 ?
            listOfChannels.map((channel, index) => (
              <General.ListItems key={index} onClick={() => handleChannelSelection({channel}.channel)}>#{channel}</General.ListItems>
            )) : <ThreeDots width="30" fill="#6c5ce7" style={{paddingLeft: "15px"}}/>
        }
      </General.List>

    </General.Section>
  );
}

export default Channels;
