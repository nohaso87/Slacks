import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";

import {
  ChatContent,
  ReplyPills,
  ReplyImage,
  ReplyData,
  ReplyTitle,
  SenderName,
  ReplyMessage,
  PillContainer,
  HeaderLoading,
  ReplyMedia,
} from "../Style";
import { ThreeDots } from "react-loading-icons";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db, storage } from "../../Config/Firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { randomColors } from "../Constants";

function ChatBody({ bundle }) {
  const [avatar, setAvatar] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [checked, setChecked] = useState([])

  const { replies } = useSelector((state) => state.replies);
  const { username, userimg } = useSelector((state) => state.user);
  const { currentDirect, messages } = useSelector((state)=>state.direct)
  const { getDirectMessages} = bundle;

  return (
    <>
      <ChatContent>
        <PillContainer>
          { 
            !currentDirect ? 
              replies.length > 0
                ? replies.map((reply, index) => {
                    var dt = new Date();
                    var timeStamp = reply.repliedAt_seconds
                      ? reply.repliedAt_seconds * 1000
                      : dt;

                    return (
                      <ReplyPills key={index}>
                        <ReplyImage img design={randomColors[Math.floor(Math.random()*randomColors.length)]}>{tempImage? "" : reply.sender[0]}</ReplyImage>
                        <ReplyData>
                          <ReplyTitle>
                            <SenderName
                              onClick={() => getDirectMessages(reply.sender)}
                              me={reply.sender === username ? "true" : "false"}
                            >
                              {reply.sender === username ? "Me" : reply.sender}
                            </SenderName>
                            <ReactTimeAgo
                              date={timeStamp}
                              locale="en-US"
                              style={{ color: "grey", fontSize: "12px" }}
                            />
                          </ReplyTitle>
                          <ReplyMessage>{reply.type === "text" ? reply.replies : (<ReplyMedia src={reply.replies} alt="post" />)}</ReplyMessage>
                        </ReplyData>
                      </ReplyPills>
                    );
                  })
                : <ThreeDots width="30" fill="#6c5ce7" style={{paddingLeft: "15px"}}/>
             : 
             messages
                ? messages.map((msg, index) => {
                    var dt = new Date();
                    var timeStamp = msg.sentAt_seconds
                      ? msg.sentAt_seconds * 1000
                      : dt;
                    return (
                      <ReplyPills key={index}>
                        <ReplyImage img={msg.imgpath}>{msg.imgpath ? "" : msg.sender[0]}</ReplyImage>
                        <ReplyData>
                          <ReplyTitle>
                            <SenderName
                              onClick={() => getDirectMessages(msg.sender)}
                              me={msg.sender === username ? "true" : "false"}
                            >
                              {msg.sender === username ? "Me" : msg.sender}
                            </SenderName>
                            <ReactTimeAgo
                              date={timeStamp}
                              locale="en-US"
                              style={{ color: "grey", fontSize: "12px" }}
                            />
                          </ReplyTitle>
                          <ReplyMessage>{msg.message}</ReplyMessage>
                        </ReplyData>
                      </ReplyPills>
                    );
                  })
                : <ThreeDots width="30" fill="#6c5ce7" style={{paddingLeft: "15px"}}/>
          }

        </PillContainer>
      </ChatContent>
    </>
  );
}

export default ChatBody;
