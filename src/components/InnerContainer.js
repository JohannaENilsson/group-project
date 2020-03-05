import React from 'react';
import { Dropbox } from 'dropbox';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { token$ } from './Store.js';

import GetAllFiles from '../actions/GetAllFiles';
import PopupAddNewFolder from '../actions/PopupAddNewFolder';

export default function InnerContainer({ fileList, getFiles, onDelete,}) {

  let history = useHistory(); // använd för breadcrums
  // console.log('history ', history);

  let location = useLocation();
  // console.log('locatopn ----->', location)

  let breadcrums = history.location.pathname.split('/').splice(1);
  let urlPath = history.location.pathname.split('/').splice(1);
 
  console.log('Breadcrums ', breadcrums);
  console.log('url ', urlPath);

// if path === folder byta till home

// breadcrumbs. joina med /

let linkToUrl = ''

  return (
    <div className='innerContainer'>
      {breadcrums.map(path => {
        linkToUrl += `/${path}`;
        console.log('Curr url ', linkToUrl);

        return (
        <div key={path}>
          <Link to={`${linkToUrl}`}>{path}</Link>

        </div>
          );

      })}
      <h2 className='innerContainerTitle'></h2>
      <GetAllFiles
        onDelete={onDelete}
        fileList={fileList}
        getFiles={getFiles}
      />
    </div>
  );
}
