import React, { useState, useEffect, useRef } from "react";
import { Dropbox } from "dropbox";
import { updateToken, updateAccountId, updateUid } from "../components/Store";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

export default function Login() {
  const [parsedToken, setParsedToken] = useState(null);

  function getTokenFromUrl() {
    console.log(" Hash => " + window.location.hash);
    console.log(" href => " + window.location.href);
    let parseUrl = queryString.parse(window.location.hash);
    let token = parseUrl.access_token;
    let account_id = parseUrl.account_id;
    let uid = parseUrl.uid;

    console.log(parseUrl);
    setParsedToken(token);
    updateToken(token);
    updateAccountId(account_id);
    updateUid(uid);
  }

  useEffect(getTokenFromUrl, []);

  return <>{parsedToken && <Redirect to={"/home"} />}</>;
}
