import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import { token$ } from './Store.js';

import Header from './Header.js';
import Sidebar from './Sidebar';
import InnerContainer from './InnerContainer';
import GetAllFiles from '../actions/GetAllFiles';

export default function Folder() {
  const [fileList, updateFileList] = useState(null);
  const [query, setQuery] = useState("")

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  let location = useLocation();

  function getFiles(currentLocation) {
    GetAllFiles(currentLocation)
      .then(function(response) {
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error('Can´t get files ', error);
      });
  }

  function onDelete(id) {
    updateFileList(fileList.filter(x => x.id !== id));
  }

  function searchFilesAndFolders(inputValue) {
  /*   dbx
      .filesSearch({ path: "", query: query })
      .then((response) => {
      }) */
      console.log(inputValue);
  }

  useEffect(() => {
    getFiles(location);
  }, [location]);

  console.log("HEJ", searchFilesAndFolders);

  return (
    <div>
      <Header
      searchFilesAndFolders={searchFilesAndFolders} />
      <div className='outerContainer'>
        <div className='sidebarContainer'>
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
