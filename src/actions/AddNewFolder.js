import React, { useState } from 'react';

import PopupAddNewFolder from './PopupAddNewFolder'

export default function AddNewFolder({ token, getFiles }) {
    const [folder, setFolder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleAddNewFolderPopup = () => {
        setShowPopup(true);
        setFolder(folder);
    }

    const handleCancelAddNewFolder = () => {
        setShowPopup(false);        
    }

    return (
        <>
            <div className="addFolderInputLabel" style={{cursor: 'pointer'}} onClick={handleAddNewFolderPopup}>Add new folder</div>
            {
                showPopup ? <PopupAddNewFolder token={token} handleCancelAddNewFolder={handleCancelAddNewFolder} getFiles={getFiles}/> : null
            }
        </>
    );
}