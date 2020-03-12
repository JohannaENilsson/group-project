import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { star$, updateStar } from './Store.js';
import MapAllFiles from '../actions/MapAllFiles';

export default function InnerContainer({
  fileList,
  onDelete,
  showStarIsClicked,
  query,
  returnFromStarList,
  searchInput
}) {
  const [starList, updateStarList] = useState(star$.value);
  const history = useHistory();

  let breadcrums = history.location.pathname.split('/').splice(1);
  let linkToUrl = '';

  function onClickStar(file) {
    updateStar([file, ...starList]);
    updateStarList([file, ...starList]);
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
        {showStarIsClicked ? (
          <p> Starred</p>
        ) : (
          breadcrums.map((path, idx) => {
            linkToUrl += `/${path}`;
            if (idx === 0) {
              return (
                <div key={path} onClick={() => returnFromStarList()}>
                  <Link to={`${linkToUrl}`}>
                    {' '}
                    {path.charAt(0).toUpperCase() + path.slice(1)}{' '}
                  </Link>
                </div>
              );
            } else {
              return (
                <div key={path} onClick={() => returnFromStarList()}>
                  <Link to={`${linkToUrl}`}>
                    {' '}
                    > {path.charAt(0).toUpperCase() + path.slice(1)}{' '}
                  </Link>
                </div>
              );
            }
          })
        )}
      </div>
      {fileList === null ? (
        <p className='error'>Loading files..</p>
      ) : (
        <MapAllFiles
          onDelete={onDelete}
          fileList={fileList}
          onClickStar={onClickStar}
          onClickStarRemove={onClickStarRemove}
          starList={starList}
          showStarIsClicked={showStarIsClicked}
          query={query}
          searchInput={searchInput}
          returnFromStarList={returnFromStarList}
        />
      )}
    </div>
  );
}
