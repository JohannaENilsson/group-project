import React, { useState } from "react";
import { token$ } from "../components/Store";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { Dropbox } from "dropbox";

export default function PopupRename({
  handleCancel,
  getFiles,
  file
}) {
  const [inputValue, setInputValue] = useState("");
  console.log(file);

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

    handleRename(inputValue);
  };
  console.log(file);
console.log(file.file.name);
  const handleRename = newName => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });

    const data = {
      from_path: `${breadcrums}/${file.file.name}`,
      to_path: `${breadcrums}/${newName}`,
      allow_shared_folder: true,
      autorename: true,
      allow_ownership_transfer: false
    };
    console.log(data);
    dbx
      .filesMoveV2(data)
      .then(function(resp) {
          console.log(resp);
          handleCancel();
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
                onClick={handleCancel}
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
