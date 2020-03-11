import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

import PopupFileToBig from './PopupFileToBig'

export default function UploadFile({ token, getFiles }) {
  const [showPopup, setshowPopup] = useState(false);

  const location = useLocation();
  let breadcrums = location.pathname.slice(5); 

  const handleUploadFile = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      // console.log(file);
      const dbx = new Dropbox({ accessToken: token, fetch });
      dbx
        .filesUpload({ path: `${breadcrums}/${file.name}`, contents: file, autorename: true })
        .then(function(resp) {
          if ((resp.size / 1000000) >= 150 ) {
            setshowPopup( true );
          } else{ 
            getFiles(location);
            console.log(resp);
            console.log(resp.size); 
          }
      })
        .catch(function(error) {
          console.log('could not upload file ', error);
        });
    }
  };

  const handleCancelPopup = () => {
    setshowPopup( false );
  }

  return (
    <div>
      <label className='uploadFileInputLabel'>
        Upload file
        <input
          className='uploadFileInput'
          type='file'
          onChange={handleUploadFile}
        />
      </label>
      {
        showPopup ? <PopupFileToBig handleCancelPopup={handleCancelPopup}/> : null
      }
    </div>
  );
}

