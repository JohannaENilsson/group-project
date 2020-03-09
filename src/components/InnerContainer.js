import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { star$, updateStar } from "./Store.js";
import MapAllFiles from "../actions/MapAllFiles";

export default function InnerContainer({
  fileList,
  onDelete,
  showStarIsClicked,
  query
  shouldStarListShow
}) {
  const [starList, updateStarList] = useState(star$.value);
  const history = useHistory(); // använd för breadcrums

  let breadcrums = history.location.pathname.split("/").splice(1);
  let linkToUrl = "";

  function onClickStar(id) {
    updateStar([id, ...starList]); //store, sparar till localStorage
    updateStarList([...starList, id]); //state
    console.log('stared file -> ', id);
  }

  function onClickStarRemove(id) {
    let removed = starList.filter(function(x) {
      return x !== id;
    });

    updateStar(removed);
    updateStarList(removed);
  }

  return (
    <div className='innerContainer'>
      <div className='breadCrumbs'>
        {breadcrums.map(path => {
          linkToUrl += `/${path}`;
          return (
            <div key={path} onClick={() => shouldStarListShow()}>
              <Link to={`${linkToUrl}`}>
                {' '}
                / {path.charAt(0).toUpperCase() + path.slice(1)}{' '}
              </Link>
            </div>
          );
        })}
      </div>
      {fileList === null ? (
        <p>Loading files..</p>
      ) : (
        <MapAllFiles
          onDelete={onDelete}
          fileList={fileList}
          onClickStar={onClickStar}
          onClickStarRemove={onClickStarRemove}
          starList={starList}
          showStarIsClicked={showStarIsClicked}
          query={query}
        />
      )}
    </div>
  );
}
