import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store';

export default function DeleteFile({ path, onDelete }) {
  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function handleDelete(e) {
    console.log(path);
    console.log(dbx);
    dbx
      .filesDeleteV2({ path: path })
      .then(function(response) {
        // console.log(response);
        onDelete(response.metadata.id);
      })
      .catch(function(error) {
        console.log('could not delete file ', error);
      });
  }

  return (
    <button onClick={e => handleDelete(e)}>
      <i className='fa fa-trash'></i>
    </button>
  );
}
