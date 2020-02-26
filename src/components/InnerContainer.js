import React from "react";
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";

export default function InnerContainer() {
  // hämtas
  // renderas ut & mappas

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  dbx
    .filesListFolder({ path: "" })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });

  return (
    <div className="innerContainer">
      <h2>Inner container title</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>{/*.map här*/}</tbody>
      </table>
    </div>
  );
}
