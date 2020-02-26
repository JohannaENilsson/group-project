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

 /*  if(parsedToken) {
    setParsedToken(null);
    return <Redirect to={'/home'} />;
  } */

  return (
    <>
    {parsedToken && <Redirect to={'/home'} /> }
    </>
  );
}

