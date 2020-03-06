import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { FaStar } from "react-icons/fa";

import { updateStar, token$ } from "../components/Store";

export default function StarFileOrFolder({
  fileId,
  onClickStar,
  onClickStarRemove,
  starred
}) {

  const clickStar = () => {
    {
      starred ? onClickStarRemove(fileId) : onClickStar(fileId);
    }
  };

  const opacity = starred ? 1 : 0.2;
  const color = starred ? "darksalmon" : "black";

  return (
    <>
      <div>
        <FaStar className="star" onClick={clickStar} style={{ opacity, color }} />
      </div>
    </>
  );
}
