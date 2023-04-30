/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  DetailsBox,
  DetailsHeader,
  DetailsContent,
  DetailsArrow,
  CreatedBy,
  RoomDetails,
  TopPoster,
  TopPosterSpan,
  HeaderLoading,
} from "../Style";

import { Utility } from "../../Utility";
import { ThreeDots } from "react-loading-icons";

function Details() {
  const [chatDetailsDropDown, setChatDetailsDropDown] = useState(false);
  const [topPosterDropDown, setTopPosterDropDown] = useState(false);
  const [createdbyDropDown, setCreatedByDropDown] = useState(false);
  const [topPostersList, setTopPostersList] = useState();
  const [when, setWhen] = useState(null);
  const utility = Utility();

  const { activeChannel } = useSelector((state) => state.channels);
  const { replies } = useSelector((state) => state.replies);
  const { currentDirect } = useSelector((state)=>state.direct)

  useEffect(() => {
    if (activeChannel) {
      const created = () => {
        let dateString = new Date(activeChannel.createdAt * 1000);
        setWhen(dateString.toDateString());
      };
      created();
    }
  }, [activeChannel]);

  useEffect(() => {
    let posters = [];
    if (activeChannel) {
      replies.forEach((element) => {
        posters.push(element.sender);
      });
      setTopPostersList(utility.minifyArray(posters));
    }
  }, [replies]);

  return (
    <>
      <DetailsBox uninstall={currentDirect ? "true" : "false"}>
      
        <DetailsHeader
          onClick={() => setChatDetailsDropDown(!chatDetailsDropDown)}
        >
          <DetailsArrow />
          About &nbsp;{activeChannel.name ? <>#{activeChannel.name}</> : <ThreeDots width="30" fill="#6c5ce7" />}
        </DetailsHeader>
        <DetailsContent active={chatDetailsDropDown}>
          <RoomDetails>{activeChannel.description}</RoomDetails>
        </DetailsContent>
        <DetailsHeader onClick={() => setTopPosterDropDown(!topPosterDropDown)}>
          <DetailsArrow />
          Top Posters
        </DetailsHeader>
        <DetailsContent active={topPosterDropDown}>
          <TopPoster>
            {topPostersList && 
            Object.keys(topPostersList).map((item, index) => <TopPosterSpan key={index}>{item}<br /></TopPosterSpan>)
            }
          </TopPoster>
        </DetailsContent>
        <DetailsHeader onClick={() => setCreatedByDropDown(!createdbyDropDown)}>
          <DetailsArrow />
          Created By
        </DetailsHeader>
        <DetailsContent active={createdbyDropDown}>
          <CreatedBy>{activeChannel.createdBy.toUpperCase()}</CreatedBy>
          <CreatedBy>Date: {when}</CreatedBy>
        </DetailsContent>
      </DetailsBox>
    </>
  );
}

export default Details;
