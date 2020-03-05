import React, { useState, useEffect } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store.js';

var imageReg = /\.(gif|jpg|jpeg|tiff|png|tif|bmp|)$/i;

export default function GetFileType({ file }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    if (imageReg.test(file.name)) {
      dbx
        .filesGetThumbnail({ path: file.path_lower, size: 'w32h32' })
        .then(res => {
          let urlBlob = URL.createObjectURL(res.fileBlob);
<<<<<<< HEAD
=======

>>>>>>> 02ac736a1a587a74a02ed5ed0fe2f9b5bd741b68
          setUrl(urlBlob);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  if (file['.tag'] === 'folder') {
    return <i className='fa fa-folder'></i>;
  } else if (imageReg.test(file.name)) {
    return <img src={url} alt={file.name}></img>;
  } else if (file['.tag'] === 'file') {
    return <i className='fa fa-file'></i>;
  }
}
