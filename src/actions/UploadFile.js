import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropbox } from 'dropbox';

export default function UploadFile({ token, getFiles }) {
  const [file, setFile] = useState(null);

  const location = useLocation(); // använd för breadcrums
  let breadcrums = location.pathname.slice(5);
  console.log('path ', breadcrums);

  const handleUploadFile = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      const dbx = new Dropbox({ accessToken: token });

      // TODO: Update path
      dbx
        .filesUpload({ path: `${breadcrums}/` + file.name, contents: file })
        .then(function(resp) {
          // console.log(resp);
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
