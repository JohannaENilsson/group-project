import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { star$, updateStar } from "./Store.js";
import MapAllFiles from "../actions/MapAllFiles";

export default function InnerContainer({
  fileList,
  onDelete,
  showStarIsClicked,
  query,
  returnHome
}) {
  const [starList, updateStarList] = useState(star$.value);
  const history = useHistory(); // använd för breadcrums

  let breadcrums = history.location.pathname.split("/").splice(1);
  let linkToUrl = "";

  function onClickStar(file) {
    updateStar([file, ...starList]); //store, sparar till localStorage
    updateStarList([file,...starList]); //state
    console.log('stared file -> ', file);
  }

  function onClickStarRemove(file) {
    let removed = starList.filter(function(x) {
      return x.id !== file.id;
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
            <div key={path} onClick={() => returnHome()}>
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
