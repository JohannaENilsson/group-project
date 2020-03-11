import React, { useState, useEffect } from 'react';

import PopupMove from './PopupMove';

export default function MoveFile({ token, getFiles }) {
    const [folder, setFolder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleAddNewFolderPopup = () => {
        setShowPopup(true);
        setFolder(folder);
    }

    const handleCancelAddNewFolder = (e) => {
        setShowPopup(false);                
    }

    return (
        <>
            <div className="addFolderInputLabel"  onClick={handleAddNewFolderPopup}>Move file</div>
            {
                showPopup ? <PopupMove token={token} handleCancelAddNewFolder={handleCancelAddNewFolder} getFiles={getFiles}/> : null
            }
        </>
    );
}