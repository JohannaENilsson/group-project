import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";

import { token$ } from "./Store";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";
import GetAllFiles from "../actions/GetAllFiles";

export default function Home() {
  const [fileList, updateFileList] = useState(null);
  const [query, setQuery] = useState("")
  const [showStarIsClicked, setShowStarIsClicked] = useState(window.localStorage.getItem("showFavorites") === "true");

  var dbx = new Dropbox({ accessToken: token$.value, fetch });
  
  let location = useLocation();

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
    }, 10000);

    return () => clearInterval(interval);
  }, [location]);


//  Denna är under konstruktion! Vill ni försöka rätta till denna så gör gärna det:) 
function searchFilesAndFolders(inputValue, fileList) {

       dbx
        .filesSearch({ path: "", query: query })
        .then((response) => {
          setQuery(response)
          console.log(response.matches);
        })
        .catch((error) => {
          console.log(error);
        })     
}
 function shouldStarListShow(childData) {
   console.log('childData', childData);
   if (!showStarIsClicked) {
     setShowStarIsClicked(true);
     window.localStorage.setItem("showFavorites", "true");
   } else {
     setShowStarIsClicked(false);
     window.localStorage.removeItem("showFavorites");
   }
 }
 

  return (
    <div>
      <Header searchFilesAndFolders={searchFilesAndFolders} />
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar
            token={token$.value}
            getFiles={getFiles}
            shouldStarListShow={shouldStarListShow}
            
          />
        </div>
        <InnerContainer
          onDelete={onDelete}
          fileList={fileList}
          getFiles={getFiles}
          showStarIsClicked={showStarIsClicked}
          shouldStarListShow = {shouldStarListShow}
        />
      </div>
    </div>
  );
}
