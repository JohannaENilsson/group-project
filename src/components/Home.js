import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";

import { token$, updateStar, star$ } from "./Store";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";
import GetAllFiles from '../actions/GetAllFiles';

export default function Home() {
  const [fileList, updateFileList] = useState(null);
  const [starList, updateStarList] = useState([]);
  const [filePath, setFilePath] = useState(["home"]);

  let location = useLocation();
  console.log('location ', location);
 
  

  function getFiles(currentLocation) {
    GetAllFiles(currentLocation) /// skicka in path
    .then(function(response) {
      updateFileList(response.entries);
    })
    .catch(function(error) {
      console.error("Can´t get files ", error);
    });
  }


  function onDelete(id) {
    updateFileList(fileList.filter(x => x.id !== id));
  }

  function onClickStar(id) {
    updateStar([id, ...starList]); //store, sparar till localStorage
    updateStarList([...starList, id]); //state
  }

  useEffect(() => {
    getFiles(location);
  }, [location]);

  // console.log("STARLIST", starList);
  // console.log("stars value", star$._value);

  return (
    <div>
      <Header />
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar token={token$.value} getFiles={getFiles} />
        </div>
        <InnerContainer
          onDelete={onDelete}
          fileList={fileList}
          getFiles={getFiles}
          onClickStar={onClickStar}
          filePath={filePath}
        />
      </div>
    </div>
  );
}
