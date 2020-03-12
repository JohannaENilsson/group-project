import React, { useState } from 'react';

import PopupRename from './PopupRename';

export default function RenameFile({ file, setDropdown }) {
  const [folder, setFolder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(true);
    setFolder(folder);
  };

  const handleCancel = e => {
    setShowPopup(false);
    setDropdown(false);
  };

  return (
    <>
      <div className='addFolderInputLabel' onClick={handlePopup}>
        Rename
      </div>
      {showPopup ? (
        <PopupRename handleCancel={handleCancel} file={file} />
      ) : null}
    </>
  );
}
