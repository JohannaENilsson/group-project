import React, { useState } from 'react';
import { token$ } from '../components/Store';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function PopupMove({ handleCancel, file }) {
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

    handleMove(inputValue);
  };

  const handleMove = newPath => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    const data = {
      from_path: `${file.file.path_lower}`,
      to_path: `/${newPath}/${file.file.name}`,
      allow_shared_folder: true,
      autorename: true,
      allow_ownership_transfer: false
    };
    console.log(data);

    dbx
      .filesMoveV2(data)
      .then((resp) => {
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
          <h3>Move file</h3>
          <form onSubmit={handleSubmit}>
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
                value='Move'
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
