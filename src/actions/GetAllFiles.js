import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store';

export default function GetAllFiles(path) {
  var dbx = new Dropbox({ accessToken: token$.value, fetch });
  console.log(path);
  let x = path.pathname.slice(5);
  console.log(x);
  return dbx.filesListFolder({ path: x });
}
