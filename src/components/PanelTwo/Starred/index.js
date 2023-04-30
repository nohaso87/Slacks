import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// styled-components
import * as General from "../../Style";
import * as local from "./StarredElements";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { setStarred } from "../../features/Users/UserSlice";
import { ThreeDots } from "react-loading-icons";

function Starred({ getselectedroomprop }) {
  const [ user ] = useAuthState(auth)
  const { starred } = useSelector((state) => state.user)
  const { activeChannel } = useSelector((state) => state.channels)
  const dispatch = useDispatch()
  

  // Load Starred 
  useEffect(()=>{
    if(activeChannel.name){
      getStarred()
    }
  },[activeChannel.name])

  const getStarred = () =>{
    const userRef = collection(db, "users")
    const userQuery = query(userRef, where("uid","==",user.uid))
    onSnapshot(userQuery, (snapshot) => {
      let starredList = []
      snapshot.forEach((starredItem) =>{
        if(!starredItem.data().starred){
          // No starred
        }else{
          const pulledList = starredItem.data().starred
          pulledList.reverse()
          starredList.push(...pulledList)
        }
      })
      dispatch(setStarred(starredList))
    })
  }

  const handleChannelSelection = (selected) => {
    getselectedroomprop(selected)
  }

  return (
    <General.Section>
      <General.Header>
        <local.Logo></local.Logo>
        <General.Name>STARRED (0)</General.Name>
      </General.Header>
      <General.List>
      {
          // Channel list
          starred &&
            starred.map((starredChannel, index) => (
              <General.ListItems key={index} onClick={()=>handleChannelSelection(starredChannel)}>#{starredChannel}</General.ListItems>
            ))
        }
      </General.List>
    </General.Section>
  );
}

export default Starred;
