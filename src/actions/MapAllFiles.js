import React from "react";
import { Link } from "react-router-dom";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";

import DeleteFile from "./DeleteFile";

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

export default function MapAllFiles({ fileList, onDelete }) {
  console.log("fileList->", fileList);

  const mappedList = fileList.map((file, idx) => {
    return (
      <tr key={file.id}>
        <td>{getIcon(file)}</td>
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
        <td>
          <DeleteFile onDelete={onDelete} path={file.path_lower} />
        </td>
      </tr>
    );
  });

// LÅT DENNA FUNKTION VARA / ANNA
  function sizeFormat(byte) {
    if (!byte) return "--";
    else if (byte > 100 && byte < 999999) {
      return (byte / 1000).toFixed(1) + " kb";
    } else if (byte >= 1000000 && byte < 1000000000) {
      return (byte / 1000000).toFixed(1) + " mb";
    } else {
      return (byte / 1000000000).toFixed(1) + "gb";
    }
  }
// LÅT DENNA FUNKTION VARA / ANNA
  function getIcon(file) {
    if (file[".tag"] === "folder") {
      return <i className="fa fa-folder"></i>;
    } else if (file[".tag"] === "file" && file.name.includes(".jpg")) {
      return "här ska en THUMBNAIL IN";
    } else if (file[".tag"] === "file") {
      return <i className="fa fa-file"></i>;
    }
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
