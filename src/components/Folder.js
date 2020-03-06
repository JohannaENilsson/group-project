import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { token$ } from './Store.js';

import Header from './Header.js';
import Sidebar from './Sidebar';
import InnerContainer from './InnerContainer';
import GetAllFiles from '../actions/GetAllFiles';

export default function Folder() {
  const [fileList, updateFileList] = useState(null);
  const [query, setQuery] = useState("")

  let location = useLocation();
  // console.log('location ', location);

  function getFiles(currentLocation) {
    // console.log('locations folder', currentLocation);
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

  function searchFilesAndFolders() {
    dbx
      .filesSearch({ path: "", query: query })
      .then((response) => {
        console.log(response);
      })
      
  }

  useEffect(() => {
    getFiles(location);
  }, [location]);

  return (
    <div>
      <Header />
      <div className='outerContainer'>
        <div className='sidebarContainer'>
          <Sidebar token={token$.value} getFiles={getFiles} />
        </div>
        <InnerContainer
          onDelete={onDelete}
          fileList={fileList}
          getFiles={getFiles}
          searchFilesAndFolders={searchFilesAndFolders}
        />
      </div>
    </div>
  );
}
