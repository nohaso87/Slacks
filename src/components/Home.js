import React, { createElement, useEffect, useState } from "react";
import { Utility } from "../Utility";
import { useSelector, useDispatch } from "react-redux";

// Firebase
import { auth, db, storage } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Styling
import { Wrapper, Panel, AppLogo, InnerPanel } from "./Style";
import { randomColors } from "./Constants";

// components
import Avatar from "./PanelTwo/Avatar";
import Starred from "./PanelTwo/Starred";
import Channels from "./PanelTwo/Channels";
import Direct from "./PanelTwo/DirectMsg";
import {
  addDoc,
  and,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import Theme from "./PanelOne/Theme";
import Details from "./PanelFour/Details";
import { setUser } from "./features/Users/UserSlice";
import ChatArea from "./PanelThree/ChatArea";
import {
  getAllRoomReplies,
  getRoomReplies,
} from "./features/Replies/ReplySlice";
import {
  resetChannel,
  setActiveChannel,
  setTotalUsersCount,
} from "./features/Channels/ChannelSlice";
import UploadAvatar from "./PanelTwo/UploadAvatar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ChatCreator from "./PanelThree/ChatCreator";
import { setCurrentDirect, setDirectMessages } from "./features/Direct/DirectSlice";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [avatarBox, setAvatarBox] = useState("hidden");

  const [label, setLabel] = useState("");
  const { uid, starred } = useSelector((state) => state.user);

  const utility = Utility();
  const { activeChannel, showChannel } = useSelector((state) => state.channels);
  const { username, userimg } = useSelector((state) => state.user);
  const { currentDirect } = useSelector((state)=>state.direct)
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      setLoadingScreen(true);
    } else if (!user) {
      utility.goTo("/Login");
    } else {
      getUserInformation();
    }
  }, [user, loading]);

  // Load Room Data
  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      if (activeChannel.name) {
        getRoomData(activeChannel.name);
      }
    }
    return () => {
      subscribed = false;
    };
  }, [activeChannel]);

  const getUserInformation = async () => {
    const userRef = collection(db, "users");
    const queryData = query(userRef, where("uid", "==", user.uid));
    onSnapshot(queryData, async (snapshot) => {
      if (snapshot.docs[0]) {
        let newData = {}
        if (snapshot.docs[0].data().imgpath.length < 1){
          newData = { ...snapshot.docs[0].data()}
        }else{
          const avatar = await getDownloadURL(
            ref(storage, snapshot.docs[0].data().imgpath)
          );
          newData = { ...snapshot.docs[0].data(), imgpath: avatar };
        }
        dispatch(setUser(newData));
      }
    });
  };
  const getRoomData = async (latestChannel) => {
    const repliesRef = collection(db, "replies");
    const repliesQuery = query(
      repliesRef,
      where("room", "==", latestChannel),
      orderBy("repliedAt")
    );

    onSnapshot(repliesQuery, (snapshot) => {
      var dataBundle = [];
      snapshot.forEach((data) => {
        dataBundle.push(utility.flattenObject(data.data()));
      });
      dispatch(getRoomReplies(dataBundle));
    });
  };
  const getSelectedRoomInfo = async (selected) => {
    const channelRef = doc(db, "channels", selected);
    const res = await getDoc(channelRef);
    let temp = { ...res.data() };
    temp.latest = res.id;
    dispatch(setActiveChannel(utility.flattenObject(temp)));
  };

  // Function to create replies
  const handleCreate = async (reply) => {
    const collectionRef = collection(db, "replies");
    await addDoc(collectionRef, {
      replies: reply,
      sender: username,
      repliedAt: serverTimestamp(),
      room: activeChannel.name,
      type: "text"
    });
  };
  const handleMedia = async (reply) => {
    const collectionRef = collection(db, "replies");
    await addDoc(collectionRef, {
      replies: reply,
      sender: username,
      repliedAt: serverTimestamp(),
      room: activeChannel.name,
      type: "image"
    });
  };
  const handleDirectMessage = async (message, to) => {
    const collectionRef = collection(db, "direct");
    await addDoc(collectionRef, {
      message,
      receiver: to,
      sender: username,
      sentAt: serverTimestamp(),
      type: "text"
    });
  };
  const handleAvatar = () => {
    if (avatarBox === "hidden") {
      setAvatarBox("visible");
      return;
    } else {
      setAvatarBox("hidden");
    }
  };
  const toggleAvatarSettings = () => {
    setSettings(!settings);
  };

  // Channel Chat Header Functions
  const usersLabel = (numberOfUsers) => {
    let text = "";
    if (numberOfUsers === 0 || !numberOfUsers) {
      setLabel("No user");
      return;
    }
    if (numberOfUsers === 1) {
      text = numberOfUsers + " user";
      setLabel(text);
      return;
    }
    text = numberOfUsers + " users";
    setLabel(text);
  };
  const getUsersCount = async () => {
    const repliesRef = collection(db, "replies");
    const repliesQuery = query(
      repliesRef,
      where("room", "==", activeChannel.name),
      orderBy("repliedAt")
    );

    onSnapshot(repliesQuery, (snapshot) => {
      let userList = [];
      snapshot.forEach((listing) => {
        if (userList.indexOf(listing.data().sender) < 0) {
          userList.push(listing.data().sender);
        }
      });
      dispatch(setTotalUsersCount(userList.length));
    });
  };
  const setStarredList = async () => {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", uid));
    const userDocument = await getDocs(userQuery);
    const actualUser = userDocument.docs[0];
    const docRef = doc(db, "users", actualUser.id);

    if (starred.length === 0) {
      await updateDoc(docRef, {
        starred: arrayUnion(activeChannel.name),
      });
    } else {
      const duplicate = actualUser.data().starred.indexOf(activeChannel.name);
      if (duplicate < 0) {
        await updateDoc(docRef, {
          starred: arrayUnion(activeChannel.name),
        });
      } else {
        await updateDoc(docRef, {
          starred: arrayRemove(activeChannel.name),
        });
      }
    }
  };


  // Direct Messaging function
  const getDirectMessages = (sender) => {
    const collectionRef = collection(db, "direct");
    const queryRef = query(
      collectionRef,
      or(
        and(
          where("receiver","==",username),
          where("sender","==",sender)
        ),
        and(
          where("receiver","==",sender),
          where("sender","==",username),
        )
      ), orderBy('sentAt')
    );
    onSnapshot(queryRef, (snapshot) => {
      var dataBundle = [];
      snapshot.forEach((data) => {
        dataBundle.push(utility.flattenObject(data.data()));
      });
      dispatch(setDirectMessages(dataBundle));
      dispatch(setCurrentDirect(sender))
    });
  };

  const bundle = {
    label,
    starred,
    uid,
    usersLabel,
    getUsersCount,
    setStarredList,
    getDirectMessages,
    handleAvatar
  };

  return (
    <>
      <Wrapper>
        <Panel>
          <Theme />
        </Panel>
        <Panel>
          <AppLogo>SLACKX</AppLogo>
          <Avatar
            username={username}
            toggle={handleAvatar}
            toggleAvatarSettings={toggleAvatarSettings}
            settingsState={settings}
          />
          <Starred getselectedroomprop={getSelectedRoomInfo}></Starred>
          <Channels
            roomdataprop={getRoomData}
            getselectedroomprop={getSelectedRoomInfo}
          />
          <Direct bundle={bundle.getDirectMessages}></Direct>
        </Panel>
        <Panel className="thirdPanel" revealChannel={showChannel}>
          <ChatCreator createreplies={currentDirect ? handleDirectMessage : handleCreate} createMedia={handleMedia}></ChatCreator>
          <InnerPanel>
            <ChatArea bundle={bundle}></ChatArea>
            <Details></Details>
          </InnerPanel>
        </Panel>

        <UploadAvatar
          display={avatarBox}
          toggleWindow={handleAvatar}
          toggleAvatarSettings={toggleAvatarSettings}
        ></UploadAvatar>
      </Wrapper>
    </>
  );
}

export default Home;
