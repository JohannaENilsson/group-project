import React, { useEffect, useState } from "react";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";
import MapAllFiles from "../actions/MapAllFiles";

var dbx = new Dropbox({ accessToken: token$.value, fetch });

export default function GetAllFiles() {
  const [fileList, updateFileList] = useState(null);

  useEffect(() => {
    dbx
      .filesListFolder({ path: "" })
      .then(function(response) {
        updateFileList(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles fileList={fileList} />
      )}
    </>
  );
}
