import React from 'react';
import ReactDOM from 'react-dom';


export default function PopupDeleteFile({ name, handleDelete, handleCancelDelete }) {    

    return ReactDOM.createPortal((
        <div className="popupWindow">
            <div className="popupWindowContainer">
                <h3>Delete file?</h3>
            </div>
    <p>Do you really want to delete {name}?</p>
            <div className="popupWindowButtonContainer">
                <button className="popupWindowButton" onClick={handleDelete}>Delete</button>
                <button className="popupWindowButton" onClick={handleCancelDelete}>Cancel</button>
            </div>
        </div>
    ), document.body);
}