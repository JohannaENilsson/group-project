import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { Link, useHistory, useLocation } from "react-router-dom";

import { token$, star$, updateStar } from "./Store.js";
import MapAllFiles from "../actions/MapAllFiles";


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

  console.log(fileList);
  
  return (
    <div className="innerContainer">
      {breadcrums.map(path => {
        linkToUrl += `/${path}`;
        return (
          <div key={path}>
            <Link to={`${linkToUrl}`}>{path}</Link>
          </div>
        );
      })}
      <h2 className="innerContainerTitle"></h2>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles
          onDelete={onDelete}
          fileList={fileList}
          onClickStar={onClickStar}
          onClickStarRemove={onClickStarRemove}
          starList={starList}
        />
      )}
    </div>
  );
}
