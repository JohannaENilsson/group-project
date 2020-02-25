import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div>
            <div>
                <h2>Menu</h2>
                <ul className="ulMenuContainer">
                    <li>Add new folder</li>
                    <li>Add new file</li>
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