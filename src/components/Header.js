import React from 'react';
import Logout from './Logout';
import GetUserAccount from '../actions/GetUserAccount.js';

export default function Header() {
  return (
    <header>
      <h1 className='headerTitle'>Header</h1>
      <Logout />
      <GetUserAccount />
    </header>
  );
}
