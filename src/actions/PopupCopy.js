import React, { useState, useEffect } from 'react';
import { token$ } from '../components/Store';
import ReactDOM from 'react-dom';
import { Dropbox } from 'dropbox';

import GetAllFiles from '../actions/GetAllFiles';

export default function PopupCopy({ handleCancel, file }) {
  const [fileList, updateFileList] = useState(null);
  const [newPath2, setNewPath2] = useState([]);
  

  function getFiles(currentLocation) {
    GetAllFiles(currentLocation)
      .then(function(response) {
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error('Can´t get files ', error);
      });
  }

  useEffect(() => {
    getFiles({
      pathname: `/home`
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    handleCopy(newPath2.join('/'));
  };

  const handleCopy = newPath => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    const data = {
      from_path: `${file.file.path_lower}`,
      to_path: `/${newPath}/${file.file.name}`,
      allow_shared_folder: true,
      autorename: true,
      allow_ownership_transfer: false
    };

    dbx
      .filesCopyV2(data)
      .then(resp => {
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
          <h3>Copy file to:</h3>
          {!fileList ? (
            <p>Loading... </p>
          ) : (
            <div>
              {fileList.map(file => {
                if (file['.tag'] === 'folder' && fileList.length > 0) {
                  return (
                    <p
                      key={file.id}
                      onClick={() => {
                        {
                          setNewPath2([...newPath2, file.name]);
                        }
                        getFiles({
                          pathname: `/home${file.path_lower}`
                        });
                      }}
                    >
                      {file.name}
                    </p>
                  );
                }
              })}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='popupWindowButtonContainer'>
              <input
                type='submit'
                className='popupAddAndCancelButton'
                onSubmit={handleSubmit}
                value='Copy'
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
