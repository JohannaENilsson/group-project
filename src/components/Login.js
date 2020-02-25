
import React, { useState, useEffect, useRef } from 'react';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from './Store';
import { Redirect } from "react-router-dom";
import Button from './Button'

export default function Login() {
  const [token, setToken] = useState(token$.value);
  let URL = useRef(window.location.href);
  

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    console.log(' href => ' + window.location.href);
    
    if(URL !== null ){
      updateToken(URL);
      return <Redirect to={'/auth'} />;

    }
    return () => subscription.unsubscribe();
  }, []);


  function connectToDropbox() {
    var client = new Dropbox({ clientId: '2hos0tue9wqtxdo' });
    let auth = client.getAuthenticationUrl(
      'http://localhost:3000/login/auth'

    );
    // console.log(authUrl);
    // tokenFromUrl(authUrl);
    window.location.href = auth;
    // http://localhost:3000/login/callback#access_token=D4N26gVA-WAAAAAAAAAAGKbY1Acq4E67oS2Qt22D1daTAiTUhEC-PnpvZJ9OcCHk&token_type=bearer&uid=2939438752&account_id=dbid%3AAADt_HMVm1otjxXbEMckVeMHV4wjAMYaqR8
    //token -> access_token=D4N26gVA-WAAAAAAAAAAGKbY1Acq4E67oS2Qt22D1daTAiTUhEC-PnpvZJ9OcCHk
    // callback -> sida som plockar ut token och redirectar till main
  }
  

  const handleLogout = () => {
    console.log('Button clicked');
    
  }

  return (
    <>

      <button onClick={connectToDropbox}>Sign in</button>
       {/* <Button handleLogout={handleLogout} /> {/*Här ska logout functionen in*/ }
 </>
  ) 
}



    //   <Button
    //     handleLogout={handleLogout}
    //   /> {/*Här ska logout functionen in*/}
    // </>
  

