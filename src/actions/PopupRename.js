import React, { useState } from 'react';
import { token$, star$, updateStar } from '../components/Store';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function PopupRename({ handleCancel, file }) {
  const [inputValue, setInputValue] = useState('');
  const [starList, updateStarList] = useState(star$.value);

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

      // function onClickStar(file) {
    //   updateStar([file, ...starList]);
    //   updateStarList([file, ...starList]);
    // }


  function updateStarLocalStorage(newFile) {
    console.log('new name obj ', newFile);
    
        let filteredStarList = starList.filter(function(x) {
          console.log('x name ', x.name, 'file name -->', newFile.name);

          return x.id !== newFile.id;
        });
        updateStarList([...filteredStarList, newFile]);
        updateStar([...filteredStarList, newFile]);
      }
    
  

  // function onClickStarRemove(file) {
  //   let removed = starList.filter(function(x) {
  //     return x.id !== file.id;
  //   });

  //   updateStar(removed);
  //   updateStarList(removed);
  // }
  
  console.log('starlist done ',starList);

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
        updateStarLocalStorage(resp.metadata);
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
