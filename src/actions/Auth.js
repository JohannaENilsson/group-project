import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { updateToken } from '../components/Store';

export default function Auth() {
  const [parsedToken, setParsedToken] = useState(null);

  function getTokenFromUrl() {
    let parseUrl = queryString.parse(window.location.hash);
    let token = parseUrl.access_token;

    updateToken(token);
    setParsedToken(token);
  }

  useEffect(getTokenFromUrl, []);

  return <>{parsedToken && <Redirect to={'/home'} />}</>;
}
