import React, { useState } from 'react';

import PopupRename from './PopupRename';

export default function RenameFile({ getFiles, file }) {
  const [folder, setFolder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  console.log(file);

  const handlePopup = () => {
    setShowPopup(true);
    setFolder(folder);
  };

  const handleCancel = e => {
    setShowPopup(false);
  };

  return (
    <>
      <div className='addFolderInputLabel' onClick={handlePopup}>
        Rename
      </div>
      {showPopup ? (
        <PopupRename
          handleCancel={handleCancel}
          getFiles={getFiles}
          file={file}
        />
      ) : null}
    </>
  );
}
