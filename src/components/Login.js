import React, { useState } from 'react';
import { Dropbox } from 'dropbox';

import Button from './Button'

export default function() {
  function connect() {
    var client = new Dropbox({ clientId: '2hos0tue9wqtxdo' });
    let authUrl = client.getAuthenticationUrl(
      'http://localhost:3000/login/auth'
    );
    console.log(authUrl);
    // http://localhost:3000/login/callback#access_token=D4N26gVA-WAAAAAAAAAAGKbY1Acq4E67oS2Qt22D1daTAiTUhEC-PnpvZJ9OcCHk&token_type=bearer&uid=2939438752&account_id=dbid%3AAADt_HMVm1otjxXbEMckVeMHV4wjAMYaqR8
    //token -> access_token=D4N26gVA-WAAAAAAAAAAGKbY1Acq4E67oS2Qt22D1daTAiTUhEC-PnpvZJ9OcCHk
    // callback -> sida som plockar ut token och redirectar till main
  }

  const handleLogout = () => {
    console.log('Button clicked');
    
  }

  return (
    <>
      <button onClick={connect}>Sign in</button>
      <Button handleLogout={handleLogout} /> {/*Här ska logout functionen in*/ }
    </>
  ) 
}

