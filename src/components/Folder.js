import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import { token$ } from './Store.js';

import Header from './Header.js';
import Sidebar from './Sidebar';
import InnerContainer from './InnerContainer';

export default function Folder() {
  const [fileList, updateFileList] = useState(null);

  let location = useLocation();

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function getFiles(currentLocation) {
    dbx
      .filesListFolder({ path: `/${currentLocation}` })
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
    let currentLocation = location.pathname
      .split('/')
      .splice(2)
      .join('/');
    // console.log(currentLocation);
    getFiles(currentLocation);
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
        />
      </div>
    </div>
  );
}
