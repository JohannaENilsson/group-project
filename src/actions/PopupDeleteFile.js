import React from 'react';
import ReactDOM from 'react-dom';


export default function PopupDeleteFile({ name, handleDelete, handleCancelDelete }) {    

    return ReactDOM.createPortal((
        <div className="popupBackground">
            <div className="popupWindow">
                <div className="popupWindowContainer">
                    <h3>Delete file?</h3>
                </div>
                <p className="popupDeleteP">Do you really want to delete {name}?</p>
                <div className="popupWindowButtonContainer">
                    <button className="popupAddAndCancelButton" onClick={handleDelete}>Delete</button>
                    <button className="popupAddAndCancelButton" onClick={handleCancelDelete}>Cancel</button>
                </div>
            </div>
        </div>
    ), document.body);
}