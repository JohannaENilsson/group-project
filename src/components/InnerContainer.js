import React from 'react';
import { Dropbox } from 'dropbox';
import { Link } from 'react-router-dom';

import { token$ } from './Store.js';

import GetAllFiles from '../actions/GetAllFiles';
import PopupAddNewFolder from '../actions/PopupAddNewFolder';

export default function InnerContainer({
  fileList,
  getFiles,
  onDelete,
  filePath
}) {
  return (
    <div className='innerContainer'>
      <h2 className='innerContainerTitle'></h2>
      <GetAllFiles
        onDelete={onDelete}
        fileList={fileList}
        getFiles={getFiles}
      />
    </div>
  );
}
