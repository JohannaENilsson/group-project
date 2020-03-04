import { BehaviorSubject } from 'rxjs';

export const token$ = new BehaviorSubject(localStorage.getItem('token')); 

export function updateToken(token) {
  // console.log("HEJ", token);
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

// export const path$ = new BehaviorSubject(localStorage.getItem('path')); 
// export function updatePath(path) {
//   console.log("Path", path);
//   if (path) {
//     localStorage.setItem('path', token);
//   } else {
//     localStorage.removeItem('path');
//   }
// }
