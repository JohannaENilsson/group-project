import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { FaTrashAlt } from 'react-icons/fa';

import { token$ } from "../components/Store";
import PopupDeleteFile from "./PopupDeleteFile";

export default function DeleteFile({
  name,
  path,
  onDelete,
  onClickStarRemove
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteFilePopUp = () => {
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  var dbx = new Dropbox({ accessToken: token$.value, fetch });

  const handleDelete = e => {
    dbx
      .filesDeleteV2({ path })
      .then(function(response) {
        onDelete(response.metadata.id);
        onClickStarRemove(response.metadata);
      })

      .catch(function(error) {
        console.log("could not delete file ", error);
      });
  };

  return (
    <>
        <FaTrashAlt 
        className="trash" 
        onClick={e => handleDeleteFilePopUp(e)}/>

      {showPopup ? (
        <PopupDeleteFile
          name={name}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      ) : null}
    </>
  );
}
