import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";
import { token$ } from "./Store";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";
import GetAllFiles from '../actions/GetAllFiles';

export default function Home() {
  const [fileList, updateFileList] = useState(null);
  const [starList, updateStarList] = useState([]);
  const [query, setQuery] = useState("")


  let location = useLocation();
  console.log('location ', location);
 

  function getFiles(currentLocation) {
    GetAllFiles(currentLocation)
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

  useEffect(() => {
    getFiles(location);

    const interval = setInterval(() => {
    getFiles(location);      
    }, 20000);

    return () => clearInterval(interval); 
  }, [location]);

 
function searchFilesAndFolders(inputValue) {

    /*   dbx
        .filesSearch({ path: "", query: query })
        .then((response) => {
        }) */
        console.log(inputValue);
    
}

return (
    <div>
      <Header searchFilesAndFolders={searchFilesAndFolders} />
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar token={token$.value} getFiles={getFiles} />
        </div>
        <InnerContainer
          onDelete={onDelete}
          fileList={fileList}
          getFiles={getFiles}
        />
      </div>
    </div>
  );
}
