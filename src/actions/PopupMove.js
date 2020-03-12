import React, { useState, useEffect } from 'react';
import { token$ } from '../components/Store';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

import GetAllFiles from '../actions/GetAllFiles';

export default function PopupMove({ handleCancel, file }) {
  const [fileList, updateFileList] = useState(null);
  const [newPath2, setNewPath2] = useState([]);
  const location = useLocation();
  let breadcrums = location.pathname.slice(5);

console.log(fileList);

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
    getFiles(location);
  }, [location]);



  const handleSubmit = e => {
    e.preventDefault();
  

    handleMove(newPath2.join('/'));
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
          {!fileList ? <p>Loading... </p> :  
  <div>{fileList.map(file => {
    if(file['.tag'] === 'folder' && fileList.length > 0){
      console.log(file);
      
      return <p key={file.id} onClick={() => {
        {setNewPath2([...newPath2, file.name])};
        let next = getFiles({pathname: `/home${file.path_lower}`});
        console.log('resp from getFiles ', next);
      }}>{file.name}</p>;
    } 
    console.log('Array path ',newPath2);
  })}</div>
          

  
  }


          <form onSubmit={handleSubmit}>


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
