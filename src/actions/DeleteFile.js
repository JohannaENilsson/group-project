import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store.js';

// import GetAllFiles from './GetAllFiles'; // ha för att rendera om listan MEN funkar ej

export default function DeleteFile({ path, onDelete }) {
  //   const [rerender, setRerender] = useState(false);
  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function handleDelete(e) {
    console.log(path);
    console.log(dbx);
    dbx
      .filesDeleteV2({ path: path })
      .then(function(response) {
        console.log(response);
        // setRerender(true);
        //GetAllFiles();

        onDelete(response.metadata.id);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //    if(rerender){
  //        setRerender();
  //        GetAllFiles();

  //    }

  return (
    <button onClick={e => handleDelete(e)}>
      <i className='fa fa-trash'></i>
    </button>
  );
}

// GetAllFiles(); // Kalla på hämta alla filer igen.

// import ReactDOM from 'react-dom';

// return ReactDOM.createPortal((
//     <div>
//   ................
//     </div>
// ), document.body);
