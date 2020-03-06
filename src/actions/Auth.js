import React, { useState, useEffect } from 'react';
import { updateToken } from '../components/Store';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

export default function Auth() {
  const [parsedToken, setParsedToken] = useState(null);

  function getTokenFromUrl() {
    // console.log(" Hash => " + window.location.hash);
    // console.log(" href => " + window.location.href);
    let parseUrl = queryString.parse(window.location.hash);
    let token = parseUrl.access_token;

    updateToken(token);
    setParsedToken(token);
  }

  useEffect(getTokenFromUrl, []);

  return <>{parsedToken && <Redirect to={'/home'} />}</>;
}
