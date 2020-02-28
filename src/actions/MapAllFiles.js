import React from "react";
import { Link } from "react-router-dom";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";

import GetAllFiles from "../actions/GetAllFiles";
import DeleteFile from './DeleteFile';

/* function downloadFileRequest(file) {
  const dbx = new Dropbox({ accessToken: token$.value, fetch });
  dbx
    .filesDownload({ path: file.path_lower })
    .then(function(response) {
      let url = URL.createObjectURL(response.fileBlob);

      console.log("download", response);
    })
    .catch(function(error) {
      console.error(error);
    });
} */

export default function MapAllFiles({ fileList }) {
  console.log("fileList->", fileList);

  const mappedList = fileList.map((file, idx) => {
    return (
      <tr key={file.id}>
        <td>{file[".tag"]}</td>
        <td>
          {file[".tag"] === "folder" ? (
            <Link to={`/folder/${file.name}`}>{file.name}</Link>
          ) : (
            <span> {file.name}</span> //en download-funktion här
          )}
        </td>

        <td>{file.size} bytes</td>
        <td>{file.client_modified}</td>
        <td><DeleteFile path={file.path_lower}/></td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Size</th>
          <th>Last modified</th>
        </tr>
      </thead>
      <tbody>{mappedList}</tbody>
    </table>
  );
}
