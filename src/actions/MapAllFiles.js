import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropbox } from "dropbox";

import { token$ } from "../components/Store.js";
import StarFileOrFolder from './StarFileOrFolder';
import DeleteFile from "./DeleteFile";
import GetFileType from "./GetFileType";

const dbx = new Dropbox({ accessToken: token$.value, fetch });

export default function MapAllFiles({ fileList, onDelete, onClickStar }) {

  const mappedList = fileList.map((file, idx) => {
    //console.log(file.path_lower);
    // console.log('path_lower ', file.path_lower);
    return (
      <tr key={file.id}>
        <td>{<GetFileType file={file} />}</td>
        <td>
          {file[".tag"] === "folder" ? (
            <Link to={`/folder${file.path_lower}`} className="tableNameLink">
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
        <td>{dateFormat(file.client_modified)}</td>
        <td>
          <DeleteFile
            onDelete={onDelete}
            path={file.path_lower}
            name={file.name}
          />
        </td>
        <td><StarFileOrFolder fileId={file.id} onClickStar={onClickStar} /></td>
        <td>
          <span>...</span>
        </td>
      </tr>
    );
  });

  return (
    <>
      {!fileList ? (
        <p>List is empty. Upload a file or add a new folder</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>File type</th>
              <th>Name</th>
              <th>Size</th>
              <th>Last modified</th>
            </tr>
          </thead>
          <tbody>{mappedList}</tbody>
        </table>
      )}
    </>
  );
}

// LÅT DENNA FUNKTION VARA / ANNA
function sizeFormat(byte) {
  if (!byte) return "-";
  else if (byte > 100 && byte < 999999) {
    return (byte / 1000).toFixed(1) + " kb";
  } else if (byte >= 1000000 && byte < 1000000000) {
    return (byte / 1000000).toFixed(1) + " mb";
  } else {
    return (byte / 1000000000).toFixed(1) + "gb";
  }
}

// LÅT NEDAN FUNKTION VARA / ANNA

function dateFormat(date) {
  if (!date) return "-";
  let newdate = new Date(date);
  return `${newdate.toLocaleDateString()}, ${newdate.toLocaleTimeString()}`;
}

// LÅT NEDAN FUNKTION VARA / ANNA

function downloadFileRequest(file) {
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
