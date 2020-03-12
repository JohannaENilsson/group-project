import React, { useState } from 'react';
import MoveFile from './MoveFile';
import RenameFile from './RenameFile';
import CopyFile from './CopyFile';

export default function DropDown(file) {
  const [dropdown, setDropdown] = useState();
  const [PopUp, setPopUp] = useState(false);

  const handlepopUp = () => {
    setPopUp(true);
  };

  function openDropDown() {
    dropdown ? setDropdown(false) : setDropdown(true);
  }
  
  return (
    <>
      <span onClick={openDropDown}>...</span>
      {dropdown ? (
        <ul className='dropdown'>
          <li>
            <MoveFile onClick={handlepopUp} file={file} setDropdown={setDropdown}/>
          </li>
          <li>
            <RenameFile onClick={handlepopUp} file={file} setDropdown={setDropdown}/>
          </li>
          <li>
            <CopyFile onClick={handlepopUp} file={file} setDropdown={setDropdown}/>
          </li>
        </ul>
      ) : null}
    </>
  );
}
