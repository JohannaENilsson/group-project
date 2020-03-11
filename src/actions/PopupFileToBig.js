import React from 'react';
import ReactDOM from 'react-dom';


export default function PopupFileToBig({ handleCancelPopup }) {    

    return ReactDOM.createPortal((
        <div className="popupBackground">
            <div className="popupWindow">
                <div className="popupWindowContainer">
                    <h3 className="h3">The file was to big to upload, try again! <br/>
                        Maximum size is 150 mb </h3>
                </div>
                <div className="popupWindowButtonContainer">
                    <button className="popupAddAndCancelButton" onClick={handleCancelPopup}>Try again!</button>
                </div>
            </div>
        </div>
    ), document.body);
}