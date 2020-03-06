import React from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function UploadFile({ token, getFiles }) {

  const location = useLocation();
  let breadcrums = location.pathname.slice(5); // plockar bort 'home/'
  // console.log('path ', breadcrums);

  const handleUploadFile = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      // console.log(file);
      const dbx = new Dropbox({ accessToken: token });

      dbx
        .filesUpload({ path: `${breadcrums}/${file.name}`, contents: file })
        .then(function(resp) {
          getFiles(location);
        })
        .catch(function(error) {
          console.log('could not upload file ', error);
        });
    }
  };

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
    </div>
  );
}
