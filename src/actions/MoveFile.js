import React, { useState } from 'react';

import PopupMove from './PopupMove';

export default function MoveFile({ file, setDropdown }) {
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
        Move file
      </div>
      {showPopup ? (
        <PopupMove handleCancel={handleCancel} file={file} />
      ) : null}
    </>
  );
}
