import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { FaStar } from "react-icons/fa";

import { updateStar, token$ } from "../components/Store";

export default function StarFileOrFolder({
  file,
  onClickStar,
  onClickStarRemove,
  starred
}) {

  const clickStar = () => {
    console.log('i got this file ', file);
    console.log('im i stared? ', starred);
    {
      starred ? onClickStarRemove(file) : onClickStar(file);
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
