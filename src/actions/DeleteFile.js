import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store';

import PopupDeleteFile from './PopupDeleteFile';

export default function DeleteFile({ name, path, onDelete }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteFilePopUp = () => {
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  const handleDelete = e => {
    dbx
      .filesDeleteV2({ path: path })
      .then(function(response) {
        onDelete(response.metadata.id);
      })
      .catch(function(error) {
        console.log('could not delete file ', error);
      });
  };


// LAGT TILL KLASS PÅ KNAPPEN PGA STYLING, LÅT VARA :)/ANNA
  return (


    <>
      <button onClick={e => handleDeleteFilePopUp(e)}>
        <i className='fa fa-trash'></i>
      </button>

      {showPopup ? (
        <PopupDeleteFile
          name={name}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      ) : null}
    </>
  );
}
