import React, { useState } from "react";
import { useSelector } from "react-redux";

// Firebase
import { createNewChannel } from "../../Config/Firebase";

// Style
import {
  AddNewChannel,
  NewChannelWrapper,
  NewChannelForm,
  NewChannelInput,
  NewChannelAbout,
  AddChannelClose,
} from "../Style";

import { Utility } from "../../Utility";

function AddChannel(props) {
  const [channel, setChannel] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState("");
  const utility = Utility();

  const { username } = useSelector((state) => state.user);

  const handleBoxDisplay = () => {
    props.tools();
    setChannel("");
    setDescription("");
  };

  const addChannel = async (e) => {
    e.preventDefault();
    if (channel && description) {
      const channelData = {
        name: channel,
        description: description,
      };
      setAdding("Loading");
      createNewChannel(channelData, username)
        .then((res) => {
          handleBoxDisplay();
          setChannel("");
          setDescription("");
          setAdding("");
        })
        .catch((err) => {
          utility.notify(err.message);
        });
    } else {
      utility.notify("You must enter a channel name and a brief description.");
    }
  };

  return (
    <AddNewChannel status={props.status}>
      <NewChannelWrapper>
        <NewChannelForm>
          <NewChannelInput
            type="text"
            placeholder="Enter channel name"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <NewChannelAbout
            placeholder="Enter channel description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></NewChannelAbout>
          <NewChannelInput
            type="submit"
            value={adding ? adding : "ADD CHANNEL"}
            onClick={addChannel}
          />
        </NewChannelForm>
        <AddChannelClose onClick={handleBoxDisplay}>Close</AddChannelClose>
      </NewChannelWrapper>
    </AddNewChannel>
  );
}

export default AddChannel;
