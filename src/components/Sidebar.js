import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadFile from '../actions/UploadFile';
import AddNewFolder from '../actions/AddNewFolder';

export default function Sidebar({ token, getFiles }) {
  const [addFolderPopUp, setAddFolderPopUp] = useState(false);

  const handleAddFolder = () => {
    setAddFolderPopUp(true);
    console.log('Click');
  };

  return (
    <div>
      <div>
        <h2 className='sidebarTitle'>Menu</h2>
        <ul className='ulMenuContainer'>
          <li >
            <Link to={'/home'} className="homeLinkSidebar">Home</Link>
          </li>
          <li>
            <UploadFile token={token} getFiles={getFiles} />
          </li>
          <li>
            <AddNewFolder token={token} onClick={handleAddFolder} />
          </li>
          <li>Show starred</li>
        </ul>
      </div>
    </div>
  );
}
