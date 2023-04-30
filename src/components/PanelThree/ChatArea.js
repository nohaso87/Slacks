import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { ChatAreaBox } from "../Style";

function ChatArea({ bundle }) {
  
  return (
    <>
      <ChatAreaBox>
        <ChatHeader bundle={bundle}></ChatHeader>
        <ChatBody bundle={bundle}></ChatBody>
      </ChatAreaBox>
    </>
  );
}

export default ChatArea;
