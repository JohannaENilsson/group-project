import React, { useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$ } from "../components/Store.js";

var dbx = new Dropbox({ accessToken: token$.value, fetch });

export default function GetUserAccount() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    dbx
      .usersGetCurrentAccount()
      .then(function(response) {
        setProfile(response);
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

    if (profile.name === undefined) return null;


  return (
    <p>Inloggad som: {profile.name.given_name} </p>
  );
}
