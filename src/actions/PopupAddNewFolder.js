import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";

export default function PopupAddNewFolder({
  token,
  handleCancelAddNewFolder,
  getFiles
  }) 
{
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  let breadcrums = location.pathname.slice(5); 

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim().length === 0) {
      setInputValue("");
      return;
    }

    handleAddNewFolder(inputValue);
  };

  const handleAddNewFolder = folderName => {
    const dbx = new Dropbox({ accessToken: token, fetch });
    dbx
      .filesCreateFolderV2({
        path: `${breadcrums}/${folderName}`,
        autorename: true
      })
      .then(() => {
        handleCancelAddNewFolder();
        getFiles(location);
      });
  };

  return ReactDOM.createPortal(
    <div className="popupBackground">
      <div className="popupWindow">
        <div className="popupWindowContainer">
          <h3>Add new folder</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="searchAndAddNewFolderInput folder"
              type="text"
              onChange={handleChange}
              value={inputValue}
              minLength="1"
              maxLength="20"
              required
              autoFocus
              placeholder="1-20 characters"
            />

            <div className="popupWindowButtonContainer">
              <input
                type="submit"
                className="popupAddAndCancelButton"
                onSubmit={handleSubmit}
                value="Add folder"
              />

              <button
                className="popupAddAndCancelButton"
                onClick={handleCancelAddNewFolder}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
