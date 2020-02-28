import React from "react";
import { Link } from "react-router-dom";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";

import GetAllFiles from "../actions/GetAllFiles";

function downloadFileRequest(file) {
  const dbx = new Dropbox({ accessToken: token$.value, fetch });
  dbx
    .filesGetTemporaryLink({ path: file.path_lower })
    .then(function(response) {
      window.location.href = response.link;
      console.log("download", response);
    })
    .catch(function(error) {
      console.error(error);
    });
}

export default function MapAllFiles({ fileList }) {
  console.log("fileList->", fileList);

  const mappedList = fileList.map((file, idx) => {
    return (
      <tr key={file.id}>
        <td>{file[".tag"]}</td>
        <td>
          {file[".tag"] === "folder" ? (
            <Link to={`/folder/${file.name}`} className="tableNameLink">
              {file.name}
            </Link>
          ) : (
            <span
              className="tableNameLink"
              style={{ cursor: "pointer" }}
              onClick={() => downloadFileRequest(file)}
            >
              {file.name}
            </span>
          )}
        </td>

        <td>{sizeFormat(file.size)}</td>
        <td>{file.client_modified}</td>
      </tr>
    );
  });

  function sizeFormat(byte) {
    if (!byte) return "--";
    else if (byte > 100 && byte < 99999) {
      return (byte / 1000).toFixed(1) + " kb";
    } else if (byte > 100000) {
      return (byte / 1000000).toFixed(1) + " mb";
    } else return byte + "bytes";
  }

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
