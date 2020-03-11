import React, { useState } from "react";
import { token$ } from "../components/Store";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";

export default function PopupRename({
   handleCancelAddNewFolder,
  getFiles,
  file
}) {
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  let breadcrums = location.pathname.slice(5); // plockar bort 'home/'

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
console.log(file);
  const handleAddNewFolder = folderName => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx
      .filesMoveV2({
        // path: `${breadcrums}/${folderName}`,
        from_path: `${breadcrums}/${file.name}`,
        to_path: `${breadcrums}/${inputValue}`,
        autorename: true
      })
      .then(function(resp) {
          console.log(resp);
        handleCancelAddNewFolder();
        // getFiles(location);
      });
  };

  return ReactDOM.createPortal(
    <div className="popupBackground">
      <div className="popupWindow">
        <div className="popupWindowContainer">
          <h3>Rename</h3>
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
                value="Rename"
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
