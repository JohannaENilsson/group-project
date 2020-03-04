import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";


export default function Folder() {
  const [fileList, updateFileList] = useState(null);
  const [ filePath, setFilePath ] = useState('home');
  let {id} = useParams();
  console.log(id);
  var dbx = new Dropbox({ accessToken: token$.value, fetch });


function getBreadCrum(){
  console.log(" href => " + window.location.href);
  let path = window.location.href.split('/').splice(3);
  setFilePath(path)
  console.log(path);

}
  function getFiles(id) {
    dbx
      .filesListFolder({ path: `/${id}` })
      .then(function(response) {
          console.log(response);
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error('Can´t get files ', error);
      });
  }

  function onDelete(id) {
    updateFileList(fileList.filter(x => x.id !== id));
  }

    useEffect(() => {
        console.log(id);
        getFiles(id);
        getBreadCrum();
      }, []);
  
  return (
    <div>
      <Header />
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar token={token$.value} getFiles={getFiles}/>
        </div>
        <InnerContainer onDelete={onDelete} fileList={fileList} getFiles={getFiles} filePath={filePath}/>
      </div>
    </div>

  );
}
