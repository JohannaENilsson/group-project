import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const lis = ['Add new folder', 'Add new file', 'Home']
    return (
        <div>
            <div>
                <h2>Menu</h2>
                <ul className="ulMenuContainer">
                    {lis.map(li => {
                        return <li key={li} className="liSidebar">{li}</li>
                    })}
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