import React from 'react';
import { Dropbox } from 'dropbox';
import { Link, useHistory } from 'react-router-dom';

import { token$ } from './Store.js';
import GetAllFiles from '../actions/GetAllFiles';
import PopupAddNewFolder from '../actions/PopupAddNewFolder';

export default function InnerContainer({
  fileList,
  getFiles,
  onDelete,
  onClickStar
}) {
  const history = useHistory(); // använd för breadcrums
  let breadcrums = history.location.pathname.split('/').splice(1);
  // console.log(history);
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
      <GetAllFiles
        onDelete={onDelete}
        fileList={fileList}
        getFiles={getFiles}
        onClickStar={onClickStar}
      />
    </div>
  );
}
