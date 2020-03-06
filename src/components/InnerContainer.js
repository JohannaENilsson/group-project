import React from 'react';
import { Dropbox } from 'dropbox';
import { Link, useHistory } from 'react-router-dom';

import { token$ } from './Store.js';
import MapAllFiles from '../actions/MapAllFiles';
import PopupAddNewFolder from '../actions/PopupAddNewFolder';

export default function InnerContainer({ fileList, getFiles, onDelete,onClickStar }) {
  const history = useHistory(); // använd för breadcrums
  let breadcrums = history.location.pathname.split('/').splice(2);
  console.log(history);
  let linkToUrl = '';

  return (
    <div className='innerContainer'>
      {breadcrums.map(path => {
        linkToUrl += `/${path}`;
        return (
          <div key={path}>
            <Link to={`${linkToUrl}`}>{path}</Link>
          </div>
        );
      })}
      <h2 className='innerContainerTitle'></h2>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles onDelete={onDelete} fileList={fileList} onClickStar={onClickStar}/>
      )}
    </div>
  );
}
