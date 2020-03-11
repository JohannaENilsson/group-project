import React, { useState, useEffect } from 'react';

import PopupRename from './PopupRename';

export default function RenameFile({ token, getFiles, file }) {
    const [folder, setFolder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    console.log(file);

    const handleAddNewFolderPopup = () => {
        setShowPopup(true);
        setFolder(folder);
    }

    const handleCancelAddNewFolder = (e) => {
        setShowPopup(false);                
    }

    return (
        <>
            <div className="addFolderInputLabel"  onClick={handleAddNewFolderPopup}>Rename</div>
            {
                showPopup ? <PopupRename token={token} handleCancelAddNewFolder={handleCancelAddNewFolder} getFiles={getFiles} file={file}/> : null
            }
        </>
    );
}