import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from 'react-loading-icons'

import {
  ChatTitle,
  ChatHeaderBox,
  ChatInfo,
  ChatUsers,
  ChatSearchBox,
  Starr,
  SenderActiveStatus,
  HeaderLoading,
  LoadingIcon,
} from "../Style";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";

function ChatHeader({ bundle }) {
  const { activeChannel, totalUsers } = useSelector((state) => state.channels);
  const [starredcolor, setStarredcolor] = useState("false");
  const { currentDirect } = useSelector((state)=>state.direct)

  const { label, getUsersCount, usersLabel, setStarredList, starred, uid } = bundle;

  useEffect(() => {
    setStarredcolor("false");
    if (activeChannel) {
      if (starred.length > 0) {
        if (starred.indexOf(activeChannel.name) < 0) {
          setStarredcolor("false");
        } else {
          setStarredcolor("true");
        }
      }
    } else {
      //Utility.notify('')
    }
  }, [activeChannel, starredcolor, uid, starred]);

  useEffect(() => {
    if (activeChannel.name) {
      getUsersCount();
      usersLabel(totalUsers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChannel, totalUsers]);



  return (
    <>
    
      <ChatHeaderBox>
        
        <ChatInfo>
          {
            !currentDirect ? 
            (
              <ChatTitle>
                {activeChannel?.name}
                {activeChannel.name ? 
                  <Starr
                    onClick={setStarredList}
                    colorofstar={starredcolor}
                  ></Starr>
                : 
                <ThreeDots width="50" fill="#6c5ce7" />
                }
                <ChatUsers>{label}</ChatUsers>
              </ChatTitle>
            ): (
            <ChatTitle>
              {currentDirect}
              <SenderActiveStatus>Active</SenderActiveStatus>
            </ChatTitle>)
          }
        </ChatInfo>
        {activeChannel.name ? (
          <ChatSearchBox placeholder="Search messages" />
        ) : (
          ""
        )}
      </ChatHeaderBox>
    </>
  );
}

export default ChatHeader;
