import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { Link, useHistory, useLocation } from "react-router-dom";

import { token$, star$, updateStar } from "./Store.js";
import GetAllFiles from "../actions/GetAllFiles";
import PopupAddNewFolder from "../actions/PopupAddNewFolder";

export default function InnerContainer({ fileList, getFiles, onDelete }) {
  const [starList, updateStarList] = useState(star$.value);
  const history = useHistory(); // använd för breadcrums

  let breadcrums = history.location.pathname.split("/").splice(1);
  let linkToUrl = "";

  function onClickStar(id) {
    updateStar([id, ...starList]); //store, sparar till localStorage
    updateStarList([...starList, id]); //state
  }

  function onClickStarRemove(id) {
    let removed = starList.filter(function(x) {
      return x !== id;
    });

    updateStar(removed);
    updateStarList(removed);
  }

  console.log("starlist -->", starList);

  return (
    <div className="innerContainer">
      {breadcrums.map(path => {
        linkToUrl += `/${path}`;
        console.log("Curr url ", linkToUrl);

        if (path === "folder") {
          return (
            <div key={"Home"}>
              <Link to={`/home`}>Home</Link>
            </div>
          );
        } else {
          return (
            <div key={path}>
              <Link to={`${linkToUrl}`}>{path}</Link>
            </div>
          );
        }
      })}
      <h2 className="innerContainerTitle"></h2>
      <GetAllFiles
        onDelete={onDelete}
        fileList={fileList}
        getFiles={getFiles}
        onClickStar={onClickStar}
        onClickStarRemove={onClickStarRemove}
        starList={starList}
      />
    </div>
  );
}
