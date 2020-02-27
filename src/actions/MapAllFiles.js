import React from "react";
import GetAllFiles from "../actions/GetAllFiles";

export default function MapAllFiles({ fileList }) {
  console.log("fileList->", fileList);

  const mappedList = fileList.map((file, idx) => {
    return (
      <tr key={file.id}>
        <td>{file[".tag"]}</td>
        <td>{file.name}</td> {/* if-sats om det är en folder=länka vidare. annars ladda ner. Kod: {file[".tag"] === "folder" ? <Link to=?????> : <Download???>*/}
        <td>{file.size} bytes</td>
        <td>{file.client_modified}</td>
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
