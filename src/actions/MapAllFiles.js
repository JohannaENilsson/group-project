import React from "react";
import { Link } from "react-router-dom";
import { Dropbox } from "dropbox";

import { token$ } from "../components/Store.js";
import StarFileOrFolder from "./StarFileOrFolder";
import DeleteFile from "./DeleteFile";
import GetFileType from "./GetFileType";

export default function MapAllFiles({
  fileList,
  onDelete,
  onClickStar,
  onClickStarRemove,
  starList,
  showStarIsClicked,
  query
}) {
  if (showStarIsClicked) {
    let fullFavList = [];
    for (let fav of starList) {
      for (let file of fileList) {
        if (file.id === fav) {
          fullFavList.push(file);
        }
      }
    }

    fileList = fullFavList;
  }

  let searchList = null;

  if (query && query.matches.length > 0) {
    searchList = query.matches.map(x => {
      return x.metadata;
    });
    fileList = searchList;
  }

  const mappedList = fileList.map((file, idx) => {
    return (
      <tr key={file.id}>
        <td>{<GetFileType file={file} />}</td>
        <td>
          {file[".tag"] === "folder" ? (
            <Link to={`/home${file.path_lower}`} className="tableNameLink">
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
            onClickStarRemove={onClickStarRemove}
          />
        </td>
        <td>
          <StarFileOrFolder
            fileId={file.id}
            starred={starList.includes(file.id)}
            onClickStar={onClickStar}
            onClickStarRemove={onClickStarRemove}
          />
        </td>
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

function dateFormat(date) {
  if (!date) return "-";
  let newdate = new Date(date);
  return `${newdate.toLocaleDateString()}, ${newdate.toLocaleTimeString()}`;
}

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
