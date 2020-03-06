import { Dropbox } from 'dropbox';

import { token$ } from '../components/Store';

export default function GetAllFiles(path) {
  var dbx = new Dropbox({ accessToken: token$.value, fetch });
  
    
  let x = path.pathname.slice(5);
  console.log(x);
  return dbx.filesListFolder({ path: x });
}


// let currentLocation = location.pathname
// .split('/')
// .splice(2)
// .join('/');
// console.log(currentLocation);