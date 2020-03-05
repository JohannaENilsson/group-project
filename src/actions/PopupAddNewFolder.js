import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Dropbox } from 'dropbox';


export default function PopupAddNewFolder({ token,handleCancelAddNewFolder }) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNewFolder(inputValue);
<<<<<<< HEAD
        console.log(inputValue); // funkar
=======
        console.log(inputValue);

>>>>>>> 02ac736a1a587a74a02ed5ed0fe2f9b5bd741b68
    }
    
    const handleAddNewFolder = (folderName) => {
        const dbx = new Dropbox({ accessToken: token, fetch });
        dbx
            .filesCreateFolderV2({ path: "/" + folderName, autorename: true })
            .then(() => {
                handleCancelAddNewFolder();
            });
    }
    
    return ReactDOM.createPortal((
        <div className="popupWindow">
            <div className="popupWindowContainer">
                <h3>Add new folder</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} value={inputValue}   />
                    <button className="popupAddFolderButton" type="submit">Add folder</button>
                </form>
                </div>
                <div className="popupWindowButtonContainer"></div>
                <button className="popupWindowButton" onClick={handleCancelAddNewFolder}>Cancel</button>
        </div>
    ), document.body);
}