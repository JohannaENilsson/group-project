import React from 'react';

import MapAllFiles from '../actions/MapAllFiles';

export default function GetAllFiles({ fileList, getFiles, onDelete, onClickStar }) {
  // här TROR vi att det ska in OM path är tom, så är man i home, annars har man klickat på en folder och då ska det innehållet visas


  return (
    <>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles onDelete={onDelete} fileList={fileList} onClickStar={onClickStar}/>
      )}
    </>
  );
}

// IF klickat på show starred --> <MapAllFiles onDelete={onDelete} fileList={starList} />
// 


 