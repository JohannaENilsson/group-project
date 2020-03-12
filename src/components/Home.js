import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

import { token$ } from './Store';
import Header from './Header.js';
import Sidebar from './Sidebar';
import InnerContainer from './InnerContainer';
import GetAllFiles from '../actions/GetAllFiles';

export default function Home() {
  const [fileList, updateFileList] = useState(null);
  const [query, setQuery] = useState("");
  const [showStarIsClicked, setShowStarIsClicked] = useState(
    window.localStorage.getItem("showFavorites") === "true"
  );
  const [searchInput, setSearchInput] = useState("");

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

  useEffect(() => {
    getFiles(location);

    // const interval = setInterval(() => {
    //   getFiles(location);
    // }, 10000);

    // return () => clearInterval(interval);
  }, [location]);

  function searchFilesAndFolders(searchInput, fileList) {
    setSearchInput(searchInput)
    dbx
      .filesSearch({ path: '', query: searchInput })
      .then(response => {
        setQuery(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function shouldStarListShow(childData) {
    if (childData === false) {
      setShowStarIsClicked(false);
      window.localStorage.removeItem("showFavorites");
    }
    setShowStarIsClicked(true);
    window.localStorage.setItem("showFavorites", "true");

  }

  function returnFromStarList() {
    setShowStarIsClicked(window.localStorage.removeItem("showFavorites"));
  }

  return (
    <div>
      <Header searchFilesAndFolders={searchFilesAndFolders} query={query} />
      <div className='outerContainer'>
        <div className='sidebarContainer'>
          <Sidebar
            token={token$.value}
            getFiles={getFiles}
            shouldStarListShow={shouldStarListShow}
            returnFromStarList={returnFromStarList}
          />
        </div>
        <InnerContainer
          onDelete={onDelete}
          fileList={fileList}
          showStarIsClicked={showStarIsClicked}
          query={query}
          searchInput={searchInput}
          returnFromStarList={returnFromStarList}
        />
      </div>
    </div>
  );
}
