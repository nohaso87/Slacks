import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// styled-components
import * as local from "./AvatarElements";

// Firebase
import { signOut } from "firebase/auth";
import { auth, db } from "../../../Config/Firebase";
import { useSelector } from "react-redux";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Utility } from "../../../Utility";
import { resetDirect, setCurrentDirect } from "../../features/Direct/DirectSlice";
import { resetChannel } from "../../features/Channels/ChannelSlice";
import { resetUser } from "../../features/Users/UserSlice";
import { resetReply } from "../../features/Replies/ReplySlice";

function Avatar({ username, toggle, settingsState, toggleAvatarSettings }) {
  const [settings, setSettings] = useState(false)
  const [avatar, setAvatar] = useState("")
  const { userimg } = useSelector((state) => state.user)
  const utility = Utility()
  const dispatch = useDispatch()

  useEffect(()=>{
    if (userimg){
      setAvatar(userimg)
    }
  },[userimg])

  const handleSignOut = async () => {
    // const collectionRef = collection(db, "users")
    // const queryRef = query(collectionRef, where("username","==",utility.firstLetterUpper(username)))
    // const userDoc = await getDocs(queryRef)
    // const docRef = doc(db, "users",userDoc.docs[0].id)
    //   updateDoc(docRef, {
    //     active: 0
    //   }).then((res)=>{
        signOut(auth)
        dispatch(resetChannel())
        dispatch(resetDirect())
        dispatch(resetUser())
        dispatch(resetReply())
      //})
  }

  return (
    <local.Wrapper>
      <local.Image img={userimg}>{userimg ? "" : username[0]}</local.Image>
      <local.User>{username}</local.User>
      <local.Options onClick={toggleAvatarSettings}></local.Options>
      <local.Settings status={settingsState}>
        <local.SettingOptions onClick={toggle}>Change Avatar</local.SettingOptions>
        <local.SettingOptions onClick={handleSignOut}>Sign Out</local.SettingOptions>
      </local.Settings>
    </local.Wrapper>
  );
}

export default Avatar;
