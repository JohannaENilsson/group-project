import React, { useState, useEffect, useRef } from 'react';
import { Dropbox } from 'dropbox';
import { updateToken } from './Store';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

export default function Login() {
  const [parsedToken, setParsedToken] = useState(null);

  function getTokenFromUrl() {
    console.log(' href => ' + window.location.hash);
    let parseUrl = queryString.parse(window.location.hash);
    let token = parseUrl.access_token;
    console.log(parseUrl);
    setParsedToken(token);
    updateToken(token);
  }

  useEffect(getTokenFromUrl, []);

  if(parsedToken) {
    setParsedToken(null);
    return <Redirect to={'/home'} />;
  }

  return (
    <>
      <button onClick={connectToDropbox}>Sign in</button>
    </>
  );
}

function connectToDropbox() {
  var dbx = new Dropbox({ clientId: '2hos0tue9wqtxdo', fetch });
  let url = dbx.getAuthenticationUrl('http://localhost:3000/login/auth');
  window.location.href = url;
}
