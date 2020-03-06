import React from "react";

import MapAllFiles from "../actions/MapAllFiles";

export default function GetAllFiles({
  fileList,
  getFiles,
  onDelete,
  onClickStar,
  onClickStarRemove,
  starList,
}) {
 

  return (
    <>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles
          onDelete={onDelete}
          fileList={fileList}
          onClickStar={onClickStar}
          onClickStarRemove={onClickStarRemove}
          starList={starList}
        />
      )}
    </>
  );
}

// IF klickat på show starred --> <MapAllFiles onDelete={onDelete} fileList={starList} />
//
