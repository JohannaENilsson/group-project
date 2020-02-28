import React, { useState }from 'react';
import { Link } from 'react-router-dom';

import UploadFile from '../actions/UploadFile'
import AddNewFolder from '../actions/AddNewFolder'

export default function Sidebar({ token }) {
    const [addFolderPopUp, setAddFolderPopUp] = useState( false );

    const handleAddFolder = () => {
        setAddFolderPopUp( true );
        console.log('Click');        
    }

    return (
        <div>
            <div>
                <h2>Menu</h2>
                <ul className="ulMenuContainer">
                    <li>
                        <UploadFile token={token} />
                    </li>
                    <li>
                        <AddNewFolder 
                        token={token}
                        onClick={handleAddFolder}/>
                    </li>
                    <li>Home</li>
                </ul>
                <ul>
                    <li> <Link to={'/home'}>Home</Link> </li>
                    <li> <Link to={'/login'}>Login</Link> </li>
                    <li> <Link to={'/folder/:id'}>Folder</Link> </li>
                </ul>
            </div>
        </div>
    );
}
