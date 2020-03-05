import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import { token$ } from './Store.js';

import Header from './Header.js';
import Sidebar from './Sidebar';
import InnerContainer from './InnerContainer';

export default function Folder() {
  const [fileList, updateFileList] = useState(null);
  const [filePath, setFilePath] = useState('');

  let { id } = useParams();
  let location = useLocation();
  let history = useHistory();

  console.log('Id ', id);
  console.log('location ', location);
  console.log('history ', history);
  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function getFiles(currentLocation) {
    console.log('current  ', currentLocation);
    dbx
      .filesListFolder({ path: `/${currentLocation}` })
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
    let currentLocation = location.pathname
      .split('/')
      .splice(2)
      .join('/');
    console.log(currentLocation);
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
          filePath={filePath}
        />
      </div>
    </div>
  );
}
