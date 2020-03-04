import React, { useState, useEffect } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store.js';

export default function GetUserAccount() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    var dbx = new Dropbox({ accessToken: token$.value, fetch });

    dbx
      .usersGetCurrentAccount()
      .then(function(response) {
        setProfile(response);
      })
      .catch(function(error) {
        console.error('Can´t get Current account ', error);
      });
  }, []);

  if (profile.name === undefined) return null;

  return (
    <div className='userNameDiv'>
      <p className='userName'>
        <span>Logged in as:</span> {profile.name.given_name}{' '}
      </p>
    </div>
  );
}
