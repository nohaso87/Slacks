import React, { useState } from "react";
import {
  ChatCreatorBox,
  CreatorInput,
  CreatorButtonsWrap,
  CreatorButton,
  CreatorMedia,
  CreateMediaNotify,
} from "../Style";
import { useSelector } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { v4 } from "uuid";
import { Utility } from "../../Utility";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/Firebase";

function ChatCreator({ createreplies, createMedia }) {
  const [reply, setReply] = useState("");
  const [mediaUpload, setMediaUpload] = useState(null);
  const { currentDirect } = useSelector((state) => state.direct);
  const utility = Utility();

  const handleCreate = (e) => {
    e.preventDefault();
    if (reply) {
      if (currentDirect) {
        createreplies(reply, currentDirect);
        setReply("");
      } else {
        createreplies(reply);
        setReply("");
      }
    }
  };

  const launchMedia = () => {
    let fileName = document.getElementById("mediaInput");
    fileName.click();
  };
  const handleMedia = (e) => {
    e.target.disabled = true
    e.target.value = "..."
    if (mediaUpload == null) {
      utility.notify("Select an image first");
    } else {
      const mediaName = `images/${v4()}`;
      const ImageRef = ref(storage, mediaName);
      uploadBytes(ImageRef, mediaUpload)
        .then(async () => {
          // Update reply
          await getDownloadURL(ref(storage, mediaName)).then((res)=>{
            createMedia(res);
            setMediaUpload("")
            e.target.value = "Upload Media"
            e.target.disabled = false
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <ChatCreatorBox>
        <CreatorMedia>
          <AiFillPlusSquare
            onClick={launchMedia}
            style={{ fontSize: "30px", cursor: "pointer", color: "#6c5ce7" }}
          />
        </CreatorMedia>
        <CreateMediaNotify>{mediaUpload ? "Image Selected" : ""}</CreateMediaNotify>
        <CreatorInput
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your message here (Press Enter to send)"
        />
        <CreatorButtonsWrap>
          <CreatorButton
            type="submit"
            value="Add Reply"
            onClick={handleCreate}
          ></CreatorButton>
          <CreatorButton
            type="submit"
            value="Upload Media"
            onClick={handleMedia}
          ></CreatorButton>
        </CreatorButtonsWrap>
      </ChatCreatorBox>
      <input
        type="file"
        id="mediaInput"
        onChange={(e) => setMediaUpload(e.target.files[0])}
        style={{ display: "none" }}
      />
    </>
  );
}

export default ChatCreator;
