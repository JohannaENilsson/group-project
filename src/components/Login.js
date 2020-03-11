import React from "react";
import { Dropbox } from "dropbox";

export default function Login() {
  function connectToDropbox() {
    var dbx = new Dropbox({ clientId: "2hos0tue9wqtxdo", fetch });
    let url = dbx.getAuthenticationUrl("http://localhost:3000/auth"); //https://wiggly-hair.surge.sh/auth
    window.location.href = url;
  }

  return (
    <div className="loginPageDiv">
      <button className="loginButton" onClick={connectToDropbox}>Sign in</button>
    </div>
  );
}
