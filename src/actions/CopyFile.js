import React, { useState, useEffect } from 'react';

import PopupCopy from './PopupCopy';

export default function CopyFile({ file, setDropdown }) {
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
        Copy file
      </div>
      {showPopup ? (
        <PopupCopy handleCancel={handleCancel} file={file} />
      ) : null}
    </>
  );
}
