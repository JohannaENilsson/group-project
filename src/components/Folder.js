import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";

import MapAllFiles from '../actions/MapAllFiles';


export default function Folder() {
  const [fileList, updateFileList] = useState(null);
  let {id} = useParams();
  
  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  function getFiles(id) {
    dbx
      .filesListFolder({ path: `/${id}` })
      .then(function(response) {
          console.log(response);
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error('Can´t get files ', error);
      });
  }

    useEffect(() => {
        console.log(id);
        getFiles(id);
      }, []);
  
  return (
    <div className="innerContainer">

      <h2 className="innerContainerTitle">
        {id} <i>(ex Home, eller Home/Undermapp)</i>
      </h2>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles  fileList={fileList} />
      )}
    </div>
  );
}
