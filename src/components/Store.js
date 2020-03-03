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
