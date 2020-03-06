import React from 'react';
import Logout from './Logout';
import GetUserAccount from '../actions/GetUserAccount.js';
import Search from "./Search.js";

export default function Header({ searchFilesAndFolders }) {
  return (
    <header>
      <h1 className='headerTitle'>Drop<span>box</span></h1>
      <Logout />
      <GetUserAccount />
      <Search
      searchFilesAndFolders={searchFilesAndFolders} />
    </header>
  );
}
