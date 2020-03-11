import { Dropbox } from 'dropbox';
import { token$ } from '../components/Store';

export default function GetAllFiles(path) {
  var dbx = new Dropbox({ accessToken: token$.value, fetch });
  let x = path.pathname.slice(5);
  return dbx.filesListFolder({ path: x });
}
