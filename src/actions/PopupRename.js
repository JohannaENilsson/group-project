import React, { useState } from 'react';
import { token$ } from '../components/Store';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function PopupRename({ handleCancel, file }) {
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  let breadcrums = location.pathname.slice(5);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim().length === 0) {
      setInputValue('');
      return;
    }

    handleRename(inputValue);
  };

  const handleRename = newName => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    let data;
    if (file.file['.tag'] === 'file') {
      const splitFileName = file.file.name.split('.');

      data = {
        from_path: `${breadcrums}/${file.file.name}`,
        to_path: `${breadcrums}/${newName}.${splitFileName[1]}`,
        allow_shared_folder: true,
        autorename: true,
        allow_ownership_transfer: false
      };
    } else {
      data = {
        from_path: `${breadcrums}/${file.file.name}`,
        to_path: `${breadcrums}/${newName}`,
        allow_shared_folder: true,
        autorename: true,
        allow_ownership_transfer: false
      };
    }
    console.log(data);

    dbx
      .filesMoveV2(data)
      .then(function(resp) {
        console.log(resp);
        handleCancel();
      })
      .catch(resp => {
        console.log(resp);
      });
  };

  return ReactDOM.createPortal(
    <div className='popupBackground'>
      <div className='popupWindow'>
        <div className='popupWindowContainer'>
          <h3>Rename</h3>
          <form onSubmit={handleSubmit}>
            {file.file['.tag'] === 'file' && <span>new name + .file </span>}
            <input
              className='searchAndAddNewFolderInput folder'
              type='text'
              onChange={handleChange}
              value={inputValue}
              minLength='1'
              maxLength='20'
              required
              autoFocus
              placeholder='1-20 characters'
            />

            <div className='popupWindowButtonContainer'>
              <input
                type='submit'
                className='popupAddAndCancelButton'
                onSubmit={handleSubmit}
                value='Rename'
              />

              <button
                className='popupAddAndCancelButton'
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
