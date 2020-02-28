import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Dropbox } from 'dropbox';


export default function PopupAddNewFolder({ token }) {
    const [inputValue, setInputValue] = useState("")
    const [folder, setFolder] = useState()

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        let folder = inputValue;
        e.preventDefault();
        setFolder(folder);
        handleAddNewFolder();
        console.log(inputValue);
        setInputValue("")
    }
    
    const handleAddNewFolder = () => {
        const dbx = new Dropbox({ accessToken: token, fetch });
        dbx
            .filesCreateFolderV2({ path: "/home/" + folder, autorename: true })
            .then((response) => {
                console.log(response);
                setInputValue (response.name);
            });
    }

    const handleCancelButton = () => {

        console.log('Exit');
        
    }

    // Switching from controlled and uncontrolled forms.

    return ReactDOM.createPortal((
        <div className="popupWindow">
                    <button onClick={handleCancelButton}>X</button>
                <h3>Add new folder</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} value={inputValue}   />
                    <button className="buttonPopupButton" type="submit">Add folder</button>
                </form>
        </div>
    ), document.body);
}