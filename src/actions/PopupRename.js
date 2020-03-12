import React, { useState } from 'react';
import { token$ } from '../components/Store';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function PopupRename({ handleCancel, file }) {
  const [inputValue, setInputValue] = useState('');
  const [fileType, handleFileType] = useState(''); 
  const location = useLocation();
  let breadcrums = location.pathname.slice(5);

  console.log(file.file['.tag']);
  console.log(file.file.name.split('.'));
  // let fileT = '';
  // if(file.file['.tag'] === 'file'){
  //   let arr = ['.'];
  //   const splitFileName = file.file.name.split('.');
  //   arr.push(splitFileName[1]);
  //   fileT = arr.join();
  //   handleFileType(fileT);
  // }

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
    const data = {
      from_path: `${breadcrums}/${file.file.name}${fileType}`,
      to_path: `${breadcrums}/${newName}`,
      allow_shared_folder: true,
      autorename: true,
      allow_ownership_transfer: false
    };

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
