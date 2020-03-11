import React, { useState } from 'react';
import MoveFile from './MoveFile';
import RenameFile from './RenameFile';

export default function DropDown( file ) {
  const [dropdown, setDropdown] = useState();
  const [movePopUp, setMovePopUp] = useState(false);
  console.log(file);

  const handlepopUp = () => {
    setMovePopUp(true);
  };



  function openDropDown() {
    dropdown ? setDropdown(false) : setDropdown(true);
  }

  return (
    <>
      <span onClick={openDropDown}>...</span>
      {dropdown ? (
        <ul>
          <li><MoveFile  onClick={handlepopUp}/></li>
          <li><RenameFile onClick={handlepopUp} file={file}/></li>
        </ul>
      ) : null}
    </>
  );
}
