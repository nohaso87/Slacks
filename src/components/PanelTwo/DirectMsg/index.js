import React from "react";

// styled-components
import * as General from "../../Style";
import * as local from "./DirectElements";
import { useEffect } from "react";
import {
  and,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { Utility } from "../../../Utility";
import { loadDirectList } from "../../features/Direct/DirectSlice";

function Direct({ bundle }) {
  const { username } = useSelector((state) => state.user);
  const { listOfDirects, countOfDirects, currentDirect } = useSelector(
    (state) => state.direct
  );
  const { getDirectMessages } = bundle;
  const utility = Utility();
  const dispatch = useDispatch();

  // Load Chats
  useEffect(() => {

    const getAllDirectMessages = () => {
      // Queries for all the direct
      const directRef = collection(db, "direct");
      const queryRef = query(
        directRef,
        or (
        where("sender", "==", username),
        where("receiver","==",username)
        )
        ,orderBy("sentAt", "desc")
      );

      onSnapshot(queryRef, (snapshot) => {
        let direct = [];
        let directData = [];
        snapshot.forEach((data) => {
            direct.push(data.data().receiver);
            direct.push(data.data().sender);
        });
        const newArray = utility.filterArray(username, direct)
        const directUniqueList = utility.removeDuplicate(newArray)
        dispatch(loadDirectList(directUniqueList));
      });
    };

      getAllDirectMessages();

  }, [username]);

  
  return (
    <General.Section>
      <General.Header>
        <local.Logo></local.Logo>
        <General.Name>DIRECT MESSAGES ({countOfDirects})</General.Name>
      </General.Header>
      <General.List>
        {" "}
        {
          // Channel list
          listOfDirects &&
            listOfDirects.map((direct, index) => (
              <General.ListItems key={index} onClick={() => bundle(direct)}>
                {direct} <General.ActiveLight></General.ActiveLight>
              </General.ListItems>
            ))
        }
      </General.List>
    </General.Section>
  );
}

export default Direct;
