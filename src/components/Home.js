import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Dropbox } from "dropbox";
import { token$ } from "./Store";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";

export default function Home() {
  const [fileList, updateFileList] = useState(null);
  const [starList, updateStarList] = useState([]);

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function getFiles() {
    dbx
      .filesListFolder({ path: "" })
      .then(function(response) {
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  function onDelete(id) {
    updateFileList(fileList.filter(x => x.id !== id));
  }

  function onClickStar(id) {
    console.log('Id', id);
    updateStarList([id, ...starList]);
    console.log('STARLIST', starList);
    
  }

  useEffect(() => {
    getFiles();
  }, []);


  return (
    <div>
      <Header />
      <h2 className="pageTitle">Home</h2>
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar token={token$.value} getFiles={getFiles}/>
        </div>
        <InnerContainer onDelete={onDelete} fileList={fileList} getFiles={getFiles} onClickStar={onClickStar}/>
      </div>
    </div>
  );
}
