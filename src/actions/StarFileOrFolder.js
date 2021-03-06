import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarFileOrFolder({
  file,
  onClickStar,
  onClickStarRemove,
  starred
}) {
  const clickStar = () => {
    starred ? onClickStarRemove(file) : onClickStar(file);
  };

  const opacity = starred ? 1 : 0.2;
  const color = starred ? "darksalmon" : "black";

  return (
    <>
      <div>
        <FaStar
          className="star"
          onClick={clickStar}
          style={{ opacity, color }}
        />
      </div>
    </>
  );
}

