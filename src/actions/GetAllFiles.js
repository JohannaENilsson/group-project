import React, { useEffect, useState } from "react";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";
import MapAllFiles from "../actions/MapAllFiles";

var dbx = new Dropbox({ accessToken: token$.value, fetch });

export default function GetAllFiles() {
  const [fileList, updateFileList] = useState(null);

  // här TROR vi att det ska in OM path är tom, så är man i home, annars har man klickat på en folder och då ska det innehållet visas

  function getFiles() {
    dbx
      .filesListFolder({ path: "" })
      .then(function(response) {
          console.log(response);
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  function onDelete(id) {
    updateFileList(fileList.filter(x => x.id !== id));
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles onDelete={onDelete} fileList={fileList} />
      )}
    </>
  );
}
