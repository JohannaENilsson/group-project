import React, { useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";

var dbx = new Dropbox({ accessToken: token$.value, fetch });
console.log(token$.value)

export default function GetUserAccount() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    dbx
      .usersGetCurrentAccount()
      .then(function(response) {
        setProfile(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

  if (profile.name === undefined) return null;

  return (
    <div className="userNameDiv">
      <p className="userName"><span>Logged in as:</span> {profile.name.given_name} </p>
    </div>
  );
}
